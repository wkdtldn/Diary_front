import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
import torch.optim as optim
import os
import torch.nn.init as init

class NLP(nn.Module):
    def __init__(self, input_dim, embedding_dim, hidden_dim, output_dim):
        super(NLP,self).__init__()
        self.embedding = nn.Embedding(input_dim, embedding_dim)
        self.fc1 = nn.Linear(embedding_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, output_dim)
        self.relu = nn.ReLU()
        self.sigmoid = nn.Sigmoid()

    def init_weight(self):
        init_range = 0.5
        # self.embedding.weight.uniform_(-init_range, init_range)
        # self.fc1.weight.uniform_(-init_range, init_range)
        # self.fc1.bias.data.zero_()
        # self.fc2.weight.uniform_(-init_range, init_range)
        # self.fc2.bias.data.zero_()
        init.uniform_(self.embedding.weight, -init_range, init_range)
        init.uniform_(self.fc1.weight, -init_range, init_range)
        self.fc1.bias.data.zero_()
        init.uniform_(self.fc2.weight, -init_range, init_range)

    def forward(self, text):
        embedded = self.embedding(text)
        embedded = embedded.mean(dim=1)  # 임베딩된 벡터들의 평균을 구함
        text = self.fc1(embedded)
        text = self.relu(text)
        text = self.fc2(text)
        text = self.sigmoid(text)
        return text
    