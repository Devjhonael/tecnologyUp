from flask import Flask, redirect, url_for, render_template, request, session, flash
from dotenv import load_dotenv
from config import Config
from db_config import db
from flask_cors import CORS
from functools import wraps

from models import *

load_dotenv()
app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = 'hugo'
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://u472469844_est11:#Bd00011@srv1006.hstgr.io/u472469844_est11"
CORS(app)

db.init_app(app)
with app.app_context():
    db.create_all()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'login-in' not in session:
            flash('Necesitas iniciar sesión para acceder a esta página', 'warning')
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function


# instanciar las extenciones
# db.init_app(app)
with app.app_context():
    db.create_all()
# ma.init_app(app)


@app.route('/admin')
@login_required  # Protege esta ruta para que solo los usuarios logueados puedan acceder
def admin():
    return render_template('admin.html')


@app.route('/login', methods=['GET', 'POST'])
def login():

    return render_template('login.html')


@app.route("/login_up", methods=['GET', 'POST'])
def login_up():
    # print("hugo formulario")
    if request.method=='POST':
        correo=request.form['txtCorreo']
        print(correo)
        return render_template('index.html',correo=correo)
    
    # print('yo quiero trabajar get ')
    # if request.method == "POST" and 'txtCorreo' in request.form and 'txtPassword':
    #     _correo = request.form['txtCorreo']
    #     _password = request.form['txtPassword']
    #     userLogin = User.query.filter_by(
    #         email=_correo, password=_password).first()

    #     # print(userLogin.email)

    #     if userLogin:
    #         session['login-in'] = True
    #         session['id'] = userLogin[0]
    #         correo = userLogin[1]
    #         return render_template('admin.html', correo=correo)
    #     else:
    #         return render_template('index.html', mensaje="Credenciales incorrectas")
    # else:
    #     return {
    #         "content": "",
    #         "message": "metodo incorrecto"
    #     }


@app.route('/logout')
def logout():
    session.pop('login-in', None)
    session.pop('id', None)
    return redirect(url_for('home'))



@app.route('/')
def home():
    categorys = db.session.query(Category).all()
    categoria = []
    print(categorys)
    lista_productos_categorias=[]
    # for category in categorys:
        # categorias = db.session.query(Product).filter(Product.category_id == category.id).all()

        # print(categorias)
        # lista_productos_categorias.append(categorias)
        # categoria.append({
        #     'id':category.id,
        #     'name': category.name,
        #     'descripcion': category.description,
        #     'imagen_url': category.imagen_url
        # })

    # for productos_categorias in lista_productos_categorias:
        # print(productos_categorias)
    return render_template('index.html', categoria=categoria,lista_productos_categorias=lista_productos_categorias)

    # print(len(categorias))
    # if len(categorias)==0:
    #     return {
    #         "message": "categoria no existe",
    #         "content": None
    #     }, 404
    # print(categorias)

    # products = db.session.query(Product).all()
    # producto = []
    # for product in products:
    #     print(product.__dict__)
    #     producto.append({
    #         'nombre': product.name,
    #         'precio': product.price
    #     })
# 
    # return render_template('index.html', categoria=categoria, producto=producto)

# @app.route('/productos')
# def producto():
#     products = db.session.query(Product).all()
#     producto=[]
#     for product in products:
#         print(product.__dict__)
#         producto.append({
#             'nombre':product.name,
#             'precio':product.price
#         })
#     return render_template('index.html',producto=producto)


@app.route("/categoria/<int:id>")
def categoria(id):
    # mostrar full categorias 
    categorys = db.session.query(Category).all()
    categoria = []
    for category in categorys:
        categorias = db.session.query(Product).filter(
        Product.category_id == category.id).all()
        # print(categorias)
        categoria.append({
            'id':category.id,
            'name': category.name,
            'descripcion': category.description,
            'imagen_url': category.imagen_url
        })

    # mostrar productos por categorias
    productos_categorias = db.session.query(Product).filter(Product.category_id == id).all()
    # print(len(productos_categorias))
    if len(productos_categorias)==0:
        return {
            "message": "categoria no existe",
            "content": None
        }, 404
    # print(productos_categorias)
    list_productos=[]
    for producto in productos_categorias:
        productos_copy=producto.__dict__.copy()
        del productos_copy['_sa_instance_state']
        # print(productos_copy)
        list_productos.append(productos_copy)
    return render_template('categoria.html',list_productos=list_productos,categoria=categoria   )


if __name__ == '__main__':
    app.run(port=5000, debug=True)
