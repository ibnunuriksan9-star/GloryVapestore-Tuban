// Data
const products = [
    {
        id: 1,
        name: "Lost Vape Centaurus M200",
        price: 850000,
        image: "centaurus.png",
        specs: [
            "Dual 18650 Battery (Not Included)",
            "5-200W Power Range",
            "Lost Vape Quest Chip",
            "0.96 inch OLED Screen",
            "Body Material: Aluminum Alloy & Stainless Steel"
        ]
    },
    {
        id: 2,
        name: "OXVA Xlim Pro Pod Kit",
        price: 320000,
        image: "oxva.png",
        specs: [
            "1000mAh Build-in Battery",
            "30W Max Output",
            "RGB Light Display",
            "Top Fill Cartridge (Anti-Leak)",
            "Auto-Draw & Button Activation"
        ]
    },
    {
        id: 3,
        name: "Centaurus DNA250C (Limited)",
        price: 2100000,
        image: "centaurus.png", // Reuse placeholder for demo
        specs: [
            "Evolv DNA250C Chipset",
            "1-200W Output",
            "Replay Mode",
            "Premium Leather Grip",
            "USB On-The-Go Charging"
        ]
    },
    {
        id: 4,
        name: "OXVA Xlim Pro 2",
        price: 350000,
        image: "oxva.png", // Reuse placeholder for demo
        specs: [
            "1300mAh Big Battery",
            "New HD Color Screen",
            "Faster Type-C Charging",
            "Smart Flavor Replay",
            "Ergonomic Airflow Control"
        ]
    },
    {
        id: 5,
        name: "OXVA Xlim Pro",
        price: 315000,
        image: "xlim_pro.jpg",
        specs: [
            "Output Power 5-30W",
            "1000mAh Battery",
            "Glittering RGB Light",
            "Top Fill Cartridge (Anti-Leak)",
            "Auto-Draw & Button Activation"
        ]
    },
    {
        id: 6,
        name: "OXVA Xlim Go 2",
        price: 185000,
        image: "xlim_go2.jpg",
        specs: [
            "30W Max Output",
            "1000mAh Battery",
            "X-Skin Texture (Leather)",
            "Top Fill Cartridge",
            "Ergonomic AFC"
        ]
    },
    {
        id: 7,
        name: "Liquid Peanut Butter Jelly",
        price: 130000,
        image: "liquid_pbj.jpg",
        specs: [
            "Volume: 60ml",
            "Flavor: Banana / Blueberry / Strawberry",
            "Nicotine: 3mg / 6mg",
            "Creamy Series",
            "Premium Local Liquid"
        ]
    },
    {
        id: 8,
        name: "OXVA Xlim SE 2",
        price: 200000,
        image: "xlim_v2.jpg",
        specs: [
            "30W Max Output",
            "1000mAh Battery",
            "Voice Broadcasting Technology",
            "Compatible with Xlim Cartridges",
            "Stylish Pattern Design"
        ]
    },
    {
        id: 9,
        name: "FOOM x Weird Genius",
        price: 185000,
        image: "foom_wg.jpg",
        specs: [
            "Battery: 580mAh",
            "Capacity: 2ml",
            "Power: 11W",
            "Exclusive Lanyard Included",
            "USB Type-C Charging"
        ]
    }
];

let cart = [];
const phoneNumber = "6285963039656"; // 085963039656 formatted for WA

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render Products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">Rp ${product.price.toLocaleString('id-ID')}</span>
                <div class="product-actions">
                    <button class="btn-view" onclick="showProductDetail(${product.id})">
                        <i class="far fa-eye"></i> Detail
                    </button>
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> Order
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Product Details Modal
function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modalBody = document.getElementById('product-detail-body');
    modalBody.innerHTML = `
        <div class="detail-container">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <h2>${product.name}</h2>
                <h3 style="color: var(--gold); margin: 10px 0;">Rp ${product.price.toLocaleString('id-ID')}</h3>
                <p>Spesifikasi:</p>
                <ul class="detail-specs">
                    ${product.specs.map(spec => `<li><i class="fas fa-check"></i> ${spec}</li>`).join('')}
                </ul>
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal()">
                    Masukkan Keranjang
                </button>
                <button class="btn btn-secondary" onclick="closeProductModal()" style="margin-top: 10px;">
                    Kembali
                </button>
            </div>
        </div>
    `;

    document.getElementById('product-modal').style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Cart Logic
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartCount();
    alert(`"${product.name}" ditambahkan ke pesanan.`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCartItems();
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        renderCartItems();
        modal.style.display = 'flex';
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Keranjang masih kosong.</p>';
        totalEl.innerText = 'Rp 0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>Rp ${item.price.toLocaleString('id-ID')}</span>
                </div>
                <div class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i> Hapus
                </div>
            </div>
        `;
    }).join('');

    totalEl.innerText = 'Rp ' + total.toLocaleString('id-ID');
}

// Checkout (Send to WhatsApp)
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
    }

    let message = "Halo Glory Vapestore, saya ingin memesan produk berikut:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Rp ${item.price.toLocaleString('id-ID')}\n`;
        total += item.price;
    });

    message += `\nTotal Pembayaran: Rp ${total.toLocaleString('id-ID')}`;
    message += "\n\nMohon informasi ketersediaan dan metode pembayarannya. Terima kasih.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Feedback System
function sendFeedback(event) {
    event.preventDefault();
    const name = document.getElementById('feedback-name').value;
    const msg = document.getElementById('feedback-message').value;

    const waMessage = `Halo admin, saya ${name} ingin memberikan masukan:\n\n"${msg}"`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

    window.open(url, '_blank');
}

// Close modals when clicking outside
window.onclick = function (event) {
    const cartModal = document.getElementById('cart-modal');
    const prodModal = document.getElementById('product-modal');
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
    if (event.target == prodModal) {
        prodModal.style.display = "none";
    }
}

