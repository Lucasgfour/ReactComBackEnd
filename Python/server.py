#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from flask_cors import CORS, cross_origin
from flask import Flask

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'