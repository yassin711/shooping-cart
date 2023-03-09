const menuBtn = document.querySelector('.btn-menu')
const closeBtn = document.querySelector('.close')
const menu = document.querySelector('nav ul')
const mainImgs = Array.from(document.querySelectorAll('.product .main img'))
const thubnailImgs = document.querySelectorAll('.product .tabs img')

const screen = document.querySelector('.screen')
const closeScreen = document.querySelector('.close-screen')
const overLay = document.querySelector('.overlay')
const screenImg = document.querySelector('.screen-main')
const previous = document.querySelector('.screen-previous')
const next = document.querySelector('.screen-next')

const nextMain = document.querySelector('.main-next')
const previousMain = document.querySelector('.main-previous')

const screenTabsImg = Array.from(document.querySelectorAll('.screen-tabs img'))

const quantity = document.querySelector('.right .quantity')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const addToCart = document.querySelector('.add-cart')
const cartQuantity = document.querySelector('nav .cart-quantity')
const cartDetails = document.querySelector('.cart-details')
const cartBtn = document.querySelector('.cart')
menuBtn.addEventListener('click',()=>{
    menu.classList.add('toggle')
})

closeBtn.addEventListener('click',()=>{
    menu.classList.remove('toggle')
})

mainImgs.forEach(img=>{
    img.addEventListener('click',(el)=>{
        screenImg.innerHTML = ''
        const id = img.getAttribute('data-id')
        const html = `<img src='${el.target.getAttribute("src")}' data-id=${id}>`
        screenImg.insertAdjacentHTML('beforeend',html)
        overLay.classList.add('overlay-appear')
        screen.classList.add('screen-active')
        removeImgTabClass()
        screenTabsImg[id].classList.add('screen-img-active')
    })
})

closeScreen.addEventListener('click',()=>{
    screenImg.innerHTML = ''
    overLay.classList.remove('overlay-appear')
    screen.classList.remove('screen-active')
})
window.addEventListener('click',e=>{
    e.stopPropagation()
    if(!e.target.classList.contains('main-active') && e.target.tagName.toLowerCase() != 'img' && !e.target.parentElement.classList.contains('screen') ){
        screenImg.innerHTML = ''
        overLay.classList.remove('overlay-appear')
        screen.classList.remove('screen-active')
    }
})
thubnailImgs.forEach(img=>{
    img.addEventListener('click',(e)=>{
        removeImgClass()
        e.target.classList.add('tabs-active')
        const src = e.target.getAttribute('src').replace('-thumbnail','')
        const img = document.querySelector(`.product .main img[src='${src}']`)
        img.classList.add('main-active')
    })
})



function removeImgTabClass(){
    screenTabsImg.forEach(img=>{
        img.classList.remove('screen-img-active')
    })
}
function displayScreenImg(id){
    const src = mainImgs[id].getAttribute("src")
    const img = `<img src='${src}' data-id=${id}>`
    screenImg.innerHTML = ''
    screenImg.insertAdjacentHTML('beforeend',img)
}

screenTabsImg.forEach(img=>{
    img.addEventListener('click',e=>{
        removeImgTabClass()
        img.classList.add('screen-img-active')
        const id = e.target.getAttribute('data-id')
        displayScreenImg(id)
    })
})

next.addEventListener('click',()=>{
    let id = screenTabsImg.filter(img=>img.classList.contains('screen-img-active'))[0].getAttribute('data-id')
    id = id == screenTabsImg.length - 1 ? -1 : id
    displayScreenImg(+id + 1)
    removeImgTabClass()
    screenTabsImg[+id + 1].classList.add('screen-img-active')
})

previous.addEventListener('click',()=>{
    let id = screenTabsImg.filter(img=>img.classList.contains('screen-img-active'))[0].getAttribute('data-id')
    id = id == 0 ? screenTabsImg.length : id
    displayScreenImg(+id - 1)
    removeImgTabClass()
    screenTabsImg[+id - 1].classList.add('screen-img-active')
})
nextMain.addEventListener('click',()=>{
    let id = mainImgs.filter(img=>img.classList.contains('main-active'))[0].getAttribute('data-id')
    removeImgClass()
    id = id == screenTabsImg.length - 1 ? -1 : id
    mainImgs[+id + 1].classList.add('main-active')
})
previousMain.addEventListener('click',()=>{
    let id = mainImgs.filter(img=>img.classList.contains('main-active'))[0].getAttribute('data-id')
    removeImgClass()
    id = id == 0 ? screenTabsImg.length : id
    mainImgs[+id - 1].classList.add('main-active')
})
function removeImgClass(){
    mainImgs.forEach(el=>{
        el.classList.remove('main-active')
    })

    thubnailImgs.forEach(el=>{
        el.classList.remove('tabs-active')
    })

}

plus.addEventListener('click',()=>{
    quantity.textContent = +quantity.textContent + 1
})
minus.addEventListener('click',()=>{
    if(+quantity.textContent == 0) return
    quantity.textContent = +quantity.textContent - 1
    
})
addToCart.addEventListener('click',()=>{
    if(+quantity.textContent > 0) cartQuantity.textContent = quantity.textContent
    else cartQuantity.textContent = ''
    displayCardDetails()
})
cartBtn.addEventListener('click',()=>{
    cartDetails.classList.toggle('cart-details-appear')
    displayCardDetails()
})

function displayCardDetails(){
    const price = 125
    let html = ''
    if(cartQuantity.textContent == ''){
        html = '<p>Your cart is empty</p>'
        cartDetails.innerHTML = '<h2>cart</h2>'
        cartDetails.insertAdjacentHTML('beforeend',html)
    }

    else{
        html = `
        <div class="cart-product">
            <div class="up flex">
                <img src="./images/image-product-1-thumbnail.jpg" alt="">
                <div class="txt">
                    <p>Fall Limited Edition Sneakers</p>
                    <div class="total-price">
                        $${price}.00 x ${cartQuantity.textContent} $${price * +cartQuantity.textContent}
                    </div>
                </div>
                <img src="./images/icon-delete.svg" alt="" class="delete">
            </div>
        </div>
        <button class="primary">Checkout</button>
    </div>
    `
        cartDetails.innerHTML = '<h2>cart</h2>'
        cartDetails.insertAdjacentHTML('beforeend',html)
        deleteCart()
    }
}
function deleteCart(){
const deleteCartBtn = document.querySelector('.cart-details .delete')
    deleteCartBtn.addEventListener('click',()=>{
        const html = '<p>Your cart is empty</p>'
        cartDetails.innerHTML = '<h2>cart</h2>'
        cartDetails.insertAdjacentHTML('beforeend',html)
        cartQuantity.textContent = ''
    })
    
}
