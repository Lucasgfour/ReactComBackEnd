#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pymysql
from server import app
from db_config import mysql
from flask import jsonify
from flask import flash, request
from flask_cors import CORS, cross_origin

@app.route('/')
@cross_origin()
def root():
    return app.send_static_file('index.html')

@app.route('/js/<path:path>')
@cross_origin()
def send_js(path):
    return app.send_static_file('js/' + path)

@app.route('/css/<path:path>')
@cross_origin()
def send_css(path):
    return app.send_static_file('css/' + path)

@app.route("/clube/<codigo>", methods = ['GET', 'DELETE'])
@cross_origin()
def excluirPessoa(codigo):
    try:
            conn=mysql.connect()
            cur = conn.cursor(pymysql.cursors.DictCursor)
            
            if request.method == 'DELETE':
                sql = '''DELETE FROM `clubes` WHERE codigo = %s'''
                val = (codigo)
                
                cur.execute(sql, val)
                conn.commit()

                resp = jsonify(codigo)
                resp.status_code=200
                return resp
            elif request.method == 'GET':
                sql = '''SELECT * FROM `clubes` WHERE codigo = %s'''
                val = (codigo)

                cur.execute(sql, val)
                rows = cur.fetchall()
                resp = jsonify(rows)
                resp.status_code=200
                return resp
            else:
                return "método desconhecido: " + request.method
                
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
        
@app.route("/clube", methods = ['GET', 'POST', 'PUT'])
@cross_origin()
def user():
    try:
            conn=mysql.connect()
            cur = conn.cursor(pymysql.cursors.DictCursor)
            
            if request.method == 'GET':
                cur.execute("SELECT * FROM `clubes`")
                rows = cur.fetchall()
                resp = jsonify(rows)
                resp.status_code=200
                return resp
            elif request.method == 'POST':
                
                obj = request.get_json(force=True)

                nome = obj["nome"]
                serie = obj["serie"]
                estadio = obj["estadio"]
                tecnico = obj["tecnico"]
                estado = obj["estado"]
                
                sql = '''INSERT INTO `clubes` (nome, serie, estadio, tecnico, estado) VALUES (%s, %s, %s, %s, %s)'''
                val = (nome, serie, estadio, tecnico, estado)
                
                cur.execute(sql, val)
                conn.commit()
  
                resp = jsonify(obj)
                resp.status_code=200
                return resp
            elif request.method == 'PUT':
                
                obj = request.get_json(force=True)

                codigo = obj["codigo"]
                nome = obj["nome"]
                serie = obj["serie"]
                estadio = obj["estadio"]
                tecnico = obj["tecnico"]
                estado = obj["estado"]
                
                sql = '''UPDATE `clubes` SET nome=%s, serie=%s, estadio=%s, tecnico=%s, estado=%s  WHERE codigo = %s'''
                val = (nome, serie, estadio, tecnico, estado, codigo)
                
                cur.execute(sql, val)
                conn.commit()

                resp = jsonify(obj)
                resp.status_code=200
                return resp
            else:
                return "método desconhecido: " + request.method
                
    except Exception as e:
        print(e)
        return resp
    finally:
        cur.close()
        conn.close()
        
        
@app.errorhandler(404)
@cross_origin()
def not_found(error=None):
    message = {
            'status':404,
            'message':'Not Found ' + request.url,
            }
            
    resp = jsonify(message)
    resp.status_code = 404
    return resp


if __name__ == "__main__":
    app.run()    
    