#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon May 31 22:31:05 2021

@author: ely
"""

from server import app
from flaskext.mysql import MySQL
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'lucasg4'
app.config['MYSQL_DATABASE_DB'] = 'libertas2021'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
