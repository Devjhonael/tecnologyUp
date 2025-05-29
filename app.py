from flask  import Flask,redirect,url_for,render_template,request,session,flash
from dotenv import load_dotenv
from config import Config
from db_config import db
from migrate_config import migrate
from flask_cors import CORS
from functools import wraps

load_dotenv()
app=Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_DATABASE_URI']="mysql://u472469844_est11:#Bd00011@srv1006.hstgr.io/u472469844_est11"
CORS(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'login-in' not in session:
            flash('Necesitas iniciar sesión para acceder a esta página', 'warning')
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function


# instanciar las extenciones
db.init_app(app)
with app.app_context():
    db.create_all()
# ma.init_app(app)

migrate.init_app(app,db)
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/admin')
@login_required  # Protege esta ruta para que solo los usuarios logueados puedan acceder
def admin():
    return render_template('admin.html')

@app.route('/nosotros')
@login_required
def nosotros():
    return "Pagina de nosotros"

def method_name():
    pass
@app.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == "POST" and 'txtCorreo' in request.form and 'txtPassword':
        _correo = request.form['txtCorreo']
        _password = request.form['txtPassword']
        # cur = mysql.connection.cursor()
        # cur.execute(
            # "SELECT * FROM USUARIOS WHERE CORREO=%s AND CONTRASENA=%s", (_correo, _password))
        # account = cur.fetchone()
        # print(account)
        # if account:
        #     session['login-in'] = True
        #     session['id'] = account[0]
        #     correo = account[1]
            # return render_template('admin.html',correo=correo)
        # else:
            # return render_template('index.html', mensaje="Credenciales incorrectas")
    else:
        return {
            "content":"",
            "message":"metodo incorrecto"
        }


@app.route('/logout')
def logout():
    session.pop('login-in', None)
    session.pop('id', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(port=5000,debug=True)