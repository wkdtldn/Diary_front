import numpy as np
import os
import pandas as pd

def basic_data():
    train = pd.read_table(os.path.abspath(os.path.join('backend/dataset/ratings_train.txt')))
    test = pd.read_table(os.path.abspath(os.path.join('backend/dataset/ratings_test.txt')))

    return train, test

class Dataset():
    def __init__(self):
        super(Dataset).__init__()
        self.train, self.test = basic_data()
    
    @staticmethod
    def preprocess(*args, **kwargs):
        df = pd.DataFrame(args[0])
        df.drop(columns=['id'], inplace=True)
        df.drop_duplicates(subset=['document'], inplace=True)
        df.dropna(inplace=True)
        df = df.assign(document=df['document'].str.replace(pat=r'[^ \w]', repl=r'', regex=True))
        df = df.assign(document=df['document'].replace({"": np.nan}))
        df.dropna(inplace=True)

        return df