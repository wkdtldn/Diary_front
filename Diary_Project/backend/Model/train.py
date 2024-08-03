import pandas as pd
import torch
import torch.nn as nn
from konlpy.tag import Mecab
from Model_ReLU import NLP
import torchtext
from torchtext import data

tokenizer = Mecab()

train = pd.read_table("~/workspace/DiaryProject/backend/dataset/train.txt", sep='\t')
test = pd.read_table("~/workspace/DiaryProject/backend/dataset/test.txt", sep='\t')

# train = pd.read_table("~/workspace/DiaryProject/backend/dataset/ratings_train.txt", sep='\t')
# test = pd.read_table("~/workspace/DiaryProject/backend/dataset/ratings_test.txt", sep='\t')

# # data preprocessing
# train.drop(['id'], axis=1, inplace=True)
# test.drop(['id'], axis=1, inplace=True)

# import re
# from tqdm import tqdm
# import numpy as np

# train.dropna(inplace=True)
# test.dropna(inplace=True)

# def no_korea(df):
#     for idx, row in tqdm(df.iterrows(), total=len(df)):
#         new_doc = re.sub("[^가-힣 ]", '', row['document']).strip()
#         df.loc[idx, 'document'] = new_doc
#     return df

# train = no_korea(train)
# test = no_korea(test)

# train['document'].replace('', np.nan, inplace=True)
# test['document'].replace('', np.nan, inplace=True)

# train.dropna(inplace=True)
# test.dropna(inplace=True)

# train.to_csv("~/workspace/DiaryProject/backend/dataset/train.txt", sep='\t', index=False)
# test.to_csv("~/workspace/DiaryProject/backend/dataset/test.txt", sep='\t', index=False)

TEXT = data.Field(
    sequential=True,
    use_vocab=True,
    lower=True,
    tokenize=tokenizer.morphs,
    batch_first=True,
    fix_length=20
)

LABEL = data.Field(
    sequential=False,
    use_vocab=False,
    is_target=True
)

train_data, test_data = data.TabularDataset.splits(
    path = "~/workspace/DiaryProject/backend/dataset/",
    train="train.txt",
    test="test.txt",
    format='tsv',
    fields=[('text', TEXT), ('label', LABEL)],
    skip_header=True
)


TEXT.build_vocab(train_data, test_data)

batch_size = 64

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Create Iterator
train_iterator = data.Iterator(
    train_data,
    batch_size=batch_size,
    device=device
)

test_iterator = data.Iterator(
    test_data,
    batch_size=batch_size,
    device=device
)

input_dim = len(TEXT.vocab) # vocab size
embedding_dim = 100
hidden_dim = 256
output_dim = 1  # 이진 분류, n_layers

model = NLP(input_dim, embedding_dim, hidden_dim, output_dim)

import torch.optim as optim

# 최적화 함수
optimizer = optim.SGD(model.parameters(), lr=1e-3) # 0.001

# 손실 함수
criterion = nn.BCELoss()

model.to(device)
criterion.to(device)

# label(정답)과 prediction(예측)결과 값 비교 = 정확성
def binary_accuacy(preds, y):
    rounded_preds = torch.round(preds)  # 0,1로 나오게 반올림
    correct = (rounded_preds == y).float()
    acc = correct.sum() / len(correct)
    return acc

def train(model, iterator, optimizer, criterion):
    epoch_loss = 0
    epoch_acc = 0

    # train mode로 변경
    model.train()

    for batch in iterator:
        optimizer.zero_grad()

        predictions = model(batch.text).squeeze(1)

        loss = criterion(predictions, batch.label.float())
        acc = binary_accuacy(predictions, batch.label)

        loss.backward()
        optimizer.step()

        epoch_loss += loss.item()
        epoch_acc += acc.item()

    return epoch_loss / len(iterator), epoch_acc / len(iterator)

def evaluate(model, iterator, criterion):
    epoch_loss = 0
    epoch_acc = 0

    # evaluate mode로 변경
    model.eval()

    with torch.no_grad():
        for batch in iterator:
            predictions = model(batch.text).squeeze(1)

            loss = criterion(predictions, batch.label.float())
            acc = binary_accuacy(predictions, batch.label)

            epoch_loss += loss.item()
            epoch_acc += acc.item()

    return epoch_loss / len(iterator), epoch_acc / len(iterator)

def epoch_time(start_time, end_time):
    elapsed_time = end_time - start_time
    elapsed_mins = int(elapsed_time / 60)
    elapsed_secs = int(elapsed_time - (elapsed_mins * 60))
    return elapsed_mins, elapsed_secs

EPOCH = 50

from tqdm import tqdm

def write_embeddings(path, embeddings, vocab):
    with open(path, 'w') as f:
        for i, embedding in enumerate(tqdm(embeddings)):
            word = vocab.itos[i]
            # skip words with unicode symbols
            if len(word) != len(word.encode()):
                continue
            vector = ' '.join([str(i) for i in embedding.tolist()])
            f.write(f'{word} {vector}\n')

best_valid_loss = float('inf')

import time

for epoch in range(EPOCH):
    start_time = time.time()
    train_loss, train_acc = train(model, train_iterator, optimizer, criterion)
    test_loss, test_acc = evaluate(model, test_iterator, criterion)

    end_time = time.time()

    epoch_mins, epoch_secs = epoch_time(start_time, end_time)
    print(f'Epoch: {epoch+1:02} | Epoch Time: {epoch_mins}m {epoch_secs}')
    print(f'\tTrain Loss: {train_loss:.3f} | Train Acc: {train_acc*100:.2f}%')
    print(f'\t Test. Loss: {test_loss:.3f} |  Test. Acc: {test_acc*100:.2f}%')
    if test_loss < best_valid_loss:
        best_valid_loss = test_loss
        torch.save(model, 'model.pt')
        torch.save(model.state_dict(), 'model_state_dict.pt')

model.load_state_dict(torch.load('model_state_dict.pt'))

test_loss, test_acc = evaluate(model, test_iterator, criterion)
print(f'Test Loss: {test_loss:.3f} | Test Acc: {test_acc*100:.2f}%')