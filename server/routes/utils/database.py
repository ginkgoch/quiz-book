from pymongo import MongoClient

from routes.utils import consts

db = MongoClient(consts.CONNECTION_STRING)[consts.DATABASE]
