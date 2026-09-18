from flask import render_template,flash, redirect
from app import app
from app.forms import LoginForm

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect('/index')
    return render_template('login.html', title='Sign In', form=form, hide_nav=True)

@app.route("/")
@app.route("/index")
def index():
    user = {'username': 'Miguel'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        },
        {
            'author': {'username': 'Paul'},
            'body': 'Beautiful day in Nigeria!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)

@app.route("/products")
def products():
    return render_template("products.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/beauty")
def beauty():
    return render_template("beauty.html", title='Beauty', products=products)

@app.route("/books")
def books():
    return render_template("books.html", title='Books', products=products)

@app.route("/cart")
def cart():
    return render_template("cart.html")

@app.route("/deals")
def deals():
    return render_template("deals.html")

@app.route("/electronics")
def electronics():
    return render_template("electronics.html", title='Electronics', products=products)

@app.route("/fashion")
def fashion():
    return render_template("fashion.html", title='Fashion', products=products)

@app.route("/gaming")
def gaming():
    return render_template("gaming.html", title='Gaming', products=products)

@app.route("/kitchen")
def kitchen():
    return render_template("kitchen.html")

@app.route("/mobiles")
def mobiles():
    return render_template("mobiles.html")

@app.route("/product-details")
def product_details():
    return render_template("product-details.html")

@app.route("/support")
def support():
    return render_template("support.html")

@app.route("/wishlist")
def wishlist():
    return render_template("wishlist.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/contact")
def contact():  
    return render_template("contact.html")

@app.route("/giftcards")
def giftcards():
    return render_template("giftcards.html")

@app.route("/live")
def live():
    return render_template("live.html")

@app.route('/about')
def about():
    return render_template('about.html', title='About Us')

@app.route('/careers')
def careers():
    return render_template('careers.html', title='Careers')

@app.route('/investors')
def investors():
    return render_template('investors.html', title='Investors')

@app.route('/partners')
def partners():
    return render_template('partners.html', title='Partners')

@app.route('/shipping')
def shipping():
    return render_template('shipping.html', title='Shipping')

@app.route('/returns')
def returns():
    return render_template('returns.html', title='Returns')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html', title='Privacy Policy')

@app.route('/brands')
def brands():
    return render_template('brands.html', title='Brands')

@app.route('/chat')
def chat():
    return render_template('chat.html', title='Chat')

@app.route('/fragrances')  # renamed from 'frangrances' typo
def fragrances():
    return render_template('fragrances.html', title='Fragrances')

@app.route('/gaming_accessories')
def gaming_accessories():
    return render_template('gaming_accessories.html', title='Gaming Accessories')

@app.route('/gaming_audio_streaming')
def gaming_audio_streaming():
    return render_template('gaming_audio_streaming.html', title='Gaming Audio & Streaming')

@app.route('/gaming_consoles')
def gaming_consoles():
    return render_template('gaming_consoles.html', title='Gaming Consoles')

@app.route('/haircare')
def haircare():
    return render_template('haircare.html', title='Hair Care')

@app.route('/laptops')
def laptops():
    return render_template('laptops.html', title='Laptops')

@app.route('/makeups')
def makeups():
    return render_template('makeups.html', title='Makeup')

@app.route('/monitors')
def monitors():
    return render_template('monitors.html', title='Monitors')

@app.route('/pc-components')
def pc_components():
    return render_template('pc_components.html', title='PC Components')

@app.route('/skincares')
def skincares():
    return render_template('skincares.html', title='Skincare')

@app.route('/smartphones')
def smartphones():
    return render_template('smartphones.html', title='Smartphones')

@app.route('/wearables')
def wearables():
    return render_template('wearables.html', title='Wearables')

@app.route('/wellness')
def wellness():
    return render_template('wellness.html', title='Wellness')

@app.route('/smart_home')
def smart_home():
    return render_template('smart_home.html', title='Smart Home')

@app.route('/luxury_beauty')
def luxury_beauty():
    return render_template('luxury_beauty.html', title='Luxury Beauty')