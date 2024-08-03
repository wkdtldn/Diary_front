from kobert_dataset import KoBERTDataset
from kobert import get_pytorch_kobert_model
from kobert_model import BERTClassifier
from data_loader import Dataset
from transformers import AdamW
import torch
from torch.utils.data import DataLoader
from kobert_transformers import get_kobert_model
from backend.KoBERT.kobert_tokenizer import KoBERTTokenizer

train, test = Dataset().train, Dataset().test
train = Dataset().preprocess(train)
test = Dataset().preprocess(test)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = get_kobert_model()
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')

max_len = 64
batch_size = 64
warmup_ratio = 0.1
num_epochs = 5
max_grad_norm = 1
log_interval = 200
learning_rate =  5e-5

train_dataset = KoBERTDataset(train, tokenizer, max_len)

dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

model = BERTClassifier(model).to(device)
optimizer = AdamW(model.parameters(), lr=learning_rate)
loss_fn = torch.nn.CrossEntropyLoss()

model.train()
for epoch in range(num_epochs):
    total_loss = 0
    for batch in dataloader:
        optimizer.zero_grad()

        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['label'].to(device)

        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        loss = loss_fn(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

        print(f'Loss: {loss.item()}')

    print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {total_loss/len(dataloader)}')\

def evaluate_model(model, dataloader):
    model.eval()
    total_correct = 0
    total_samples = 0
    
    with torch.no_grad():
        for batch in dataloader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['label'].to(device)
            
            outputs = model(input_ids=input_ids, attention_mask=attention_mask)
            _, predicted = torch.max(outputs, dim=1)
            total_correct += (predicted == labels).sum().item()
            total_samples += labels.size(0)
    
    accuracy = total_correct / total_samples
    print(f'Accuracy: {accuracy:.4f}')

# 데이터셋을 평가용과 학습용으로 분리
eval_dataset = KoBERTDataset(test, tokenizer, max_len)
eval_dataloader = DataLoader(eval_dataset, batch_size=batch_size, shuffle=False)

# 모델 평가
evaluate_model(model, eval_dataloader)