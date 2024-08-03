import torch
import torch.nn as nn
from kobert_tokenizer import KoBERTTokenizer
from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup
from torch.utils.data import DataLoader
from dataset import BERTDataset
import gluonnlp as nlp
from Model import BERTClassifier
from transformers import BertModel
from tqdm import tqdm, tqdm_notebook

# train = pd.read_table(os.path.abspath(os.path.join('backend/dataset/ratings_train.txt')), sep='\t')
# test = pd.read_table(os.path.abspath(os.path.join('backend/dataset/ratings_train.txt')), sep='\t')

# def preprocessing_data(df):
#     df.drop(columns=['id'], inplace=True)
#     train.drop_duplicates(subset=['document'], inplace=True)
#     df.dropna(inplace=True)
#     df = df.assign(document=df['document'].str.replace(pat=r'[^ 가-힣]', repl=r'', regex=True))
#     df = df.assign(document=df['document'].replace({"": np.nan}))
#     df.dropna(inplace=True)

#     return df

# train = preprocessing_data(train)
# test = preprocessing_data(test)

# 설정
max_len = 64
batch_size = 64
warmup_ratio = 0.1
num_epochs = 5
max_grad_norm = 1
log_interval = 200
learning_rate =  5e-5

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 토크나이저와 데이터 로더 준비
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')
dataset_train = nlp.data.TSVDataset("ratings_train.txt?dl=1", field_indices=[1,2], num_discard_samples=1)
dataset_test = nlp.data.TSVDataset("ratings_test.txt?dl=1", field_indices=[1,2], num_discard_samples=1)

tok = tokenizer.tokenize

data_train = BERTDataset(dataset_train, 0, 1, tok, vocab, max_len, True, False)
data_test = BERTDataset(dataset_test, 0, 1, tok, vocab, max_len, True, False)

train_dataloader = DataLoader(data_train, batch_size=batch_size, num_workers=5)
test_dataloader = DataLoader(data_test, batch_size=batch_size, num_workers=5)

model = BERTClassifier(bertmodel,  dr_rate=0.5).to(device)

no_decay = ['bias', 'LayerNorm.weight']
optimizer_grouped_parameters = [
    {'params': [p for n, p in model.named_parameters() if not any(nd in n for nd in no_decay)], 'weight_decay': 0.01},
    {'params': [p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)], 'weight_decay': 0.0}
]

optimizer = AdamW(optimizer_grouped_parameters, lr=learning_rate)
loss_fn = nn.CrossEntropyLoss()

t_total = len(train_dataloader) * num_epochs
warmup_step = int(t_total * warmup_ratio)

scheduler = get_cosine_schedule_with_warmup(optimizer, num_warmup_steps=warmup_step, num_training_steps=t_total)

def calc_accuracy(X,Y):
    max_vals, max_indices = torch.max(X, 1)
    train_acc = (max_indices == Y).sum().data.cpu().numpy()/max_indices.size()[0]
    return train_acc


# 모델 학습
for e in range(num_epochs):
    train_acc = 0.0
    test_acc = 0.0
    model.train()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(tqdm_notebook(train_dataloader)):
        optimizer.zero_grad()
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length= valid_length
        label = label.long().to(device)
        out = model(token_ids, valid_length, segment_ids)
        loss = loss_fn(out, label)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_grad_norm)
        optimizer.step()
        scheduler.step()  # Update learning rate schedule
        train_acc += calc_accuracy(out, label)
        if batch_id % log_interval == 0:
            print("epoch {} batch id {} loss {} train acc {}".format(e+1, batch_id+1, loss.data.cpu().numpy(), train_acc / (batch_id+1)))
    print("epoch {} train acc {}".format(e+1, train_acc / (batch_id+1)))
    
    model.eval()
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(tqdm_notebook(test_dataloader)):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length= valid_length
        label = label.long().to(device)
        out = model(token_ids, valid_length, segment_ids)
        test_acc += calc_accuracy(out, label)
    print("epoch {} test acc {}".format(e+1, test_acc / (batch_id+1)))