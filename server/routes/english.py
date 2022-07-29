import random
from flask.blueprints import Blueprint
from flask import request, jsonify, abort, make_response, Response

from .utils import database, consts


blueprint_english = Blueprint('blueprint_english', __name__)


@blueprint_english.route("/words/query", methods=['POST'])
def query_words():
    request_body = request.get_json()

    records = database.db[consts.COLLECTION_ENGLISH_WORDS].find({ 'en': {'$in': request_body } }, { '_id': 0 })
    records = [r for r in records]

    return jsonify(records)
