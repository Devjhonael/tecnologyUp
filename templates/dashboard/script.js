// Datos simulados (en un proyecto real estos vendrían de una API)
const mockData = {
    orders: [
        {
            id: "ORD-2023-001",
            customer: "Juan Pérez",
            products: "Laptop HP, Mouse",
            total: 1250,
            status: "completed",
            date: "2023-05-15"
        },
        {
            id: "ORD-2023-002",
            customer: "María Gómez",
            products: "PC Gamer, Teclado",
            total: 2150,
            status: "processing",
            date: "2023-05-14"
        },
        {
            id: "ORD-2023-003",
            customer: "Carlos Ruiz",
            products: "Monitor 24\", SSD",
            total: 450,
            status: "cancelled",
            date: "2023-05-14"
        },
        {
            id: "ORD-2023-004",
            customer: "Ana Torres",
            products: "Laptop Dell, Audífonos",
            total: 1550,
            status: "completed",
            date: "2023-05-13"
        }
    ],
    products: [ // Productos para el Dashboard y Products.html
        {
            id: "PROD001",
            name: "Laptop HP Pavilion",
            category: "Laptops",
            sales: 45,
            stock: 12,
            price: 899,
            description: "Laptop potente y ligera para el día a día."
        },
        {
            id: "PROD002",
            name: "PC Gamer Ryzen 5",
            category: "PCs",
            sales: 32,
            stock: 5,
            price: 1200,
            description: "Ordenador de alto rendimiento para gaming."
        },
        {
            id: "PROD003",
            name: "Monitor 24\" Samsung",
            category: "Monitores",
            sales: 28,
            stock: 3,
            price: 199,
            description: "Monitor Full HD con excelente calidad de imagen."
        },
        {
            id: "PROD004",
            name: "Teclado Mecánico RGB",
            category: "Accesorios",
            sales: 56,
            stock: 15,
            price: 89,
            description: "Teclado retroiluminado con interruptores mecánicos."
        },
        {
            id: "PROD005",
            name: "Ratón Inalámbrico Logitech",
            category: "Accesorios",
            sales: 60,
            stock: 8,
            price: 35,
            description: "Ratón ergonómico con conexión inalámbrica estable."
        }
    ],
    clients: [
        {
            id: "CL001",
            name: "Ana García",
            email: "ana.g@example.com",
            phone: "987654321",
            address: "Calle Falsa 123",
            registrationDate: "2023-01-15"
        },
        {
            id: "CL002",
            name: "Luis Pérez",
            email: "luis.p@example.com",
            phone: "912345678",
            address: "Av. Siempre Viva 456",
            registrationDate: "2023-02-20"
        },
        {
            id: "CL003",
            name: "Sofía Martínez",
            email: "sofia.m@example.com",
            phone: "955443322",
            address: "Jr. Luna 789",
            registrationDate: "2023-03-01"
        }
    ],
    users: [
        {
            id: "USR001",
            username: "admin",
            email: "admin@techadmin.com",
            role: "Administrador",
            status: "Activo"
        },
        {
            id: "USR002",
            username: "ventas_user",
            email: "ventas@techadmin.com",
            role: "Vendedor",
            status: "Activo"
        },
        {
            id: "USR003",
            username: "almacen_op",
            email: "almacen@techadmin.com",
            role: "Almacén",
            status: "Inactivo"
        }
    ]
};

// =========================================================================
// Funciones de Ayuda para Modales
// =========================================================================
function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evita scroll en el body
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// =========================================================================
// Funciones de Carga de Datos en Tablas
// =========================================================================

// Función para cargar pedidos recientes (Dashboard)
function loadRecentOrders() {
    const ordersTable = document.getElementById('recent-orders');
    if (!ordersTable) return;

    const tbody = ordersTable.querySelector('tbody');
    tbody.innerHTML = '';

    // Ordenar por fecha más reciente
    const sortedOrders = [...mockData.orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Mostrar solo los últimos 5 pedidos
    const recentOrders = sortedOrders.slice(0, 5);
    
    recentOrders.forEach(order => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        
        let statusBadge;
        if (order.status === 'completed') {
            statusBadge = '<span class="badge badge-success">Completado</span>';
        } else if (order.status === 'processing') {
            statusBadge = '<span class="badge badge-warning">Procesando</span>';
        } else {
            statusBadge = '<span class="badge badge-danger">Cancelado</span>';
        }
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-primary btn-sm">Ver</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Actualizar contadores del Dashboard
    document.getElementById('total-orders').textContent = mockData.orders.length;
    const pendingOrders = mockData.orders.filter(o => o.status === 'processing').length;
    document.getElementById('pending-orders').textContent = `${pendingOrders} pendientes`;
}

// Función para cargar productos más vendidos (Dashboard)
function loadTopProducts() {
    const productsTable = document.getElementById('top-products');
    if (!productsTable) return;

    const tbody = productsTable.querySelector('tbody');
    tbody.innerHTML = '';

    // Ordenar por más vendidos
    const sortedProducts = [...mockData.products].sort((a, b) => b.sales - a.sales);
    
    // Mostrar solo los primeros 5 productos
    const topProducts = sortedProducts.slice(0, 5);
    
    topProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        
        let stockClass = product.stock > 10 ? 'badge-success' : 
                        product.stock > 3 ? 'badge-warning' : 'badge-danger';
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.sales}</td>
            <td><span class="badge ${stockClass}">${product.stock}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-primary btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Actualizar contador de stock bajo del Dashboard
    const lowStock = mockData.products.filter(p => p.stock < 5).length;
    document.getElementById('low-stock').textContent = lowStock;
}

// Función para cargar todos los productos (para products.html)
function loadAllProducts(searchTerm = '', categoryFilter = '') { // Añadido categoryFilter
    const productsTable = document.getElementById('products-table');
    if (!productsTable) return;

    const tbody = productsTable.querySelector('tbody');
    tbody.innerHTML = '';

    const filteredProducts = mockData.products.filter(product => {
        const matchesSearchTerm = (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
        return matchesSearchTerm && matchesCategory;
    });

    if (filteredProducts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;">No se encontraron productos que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        
        let stockClass = product.stock > 10 ? 'badge-success' : 
                        product.stock > 3 ? 'badge-warning' : 'badge-danger';
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.sales}</td>
            <td><span class="badge ${stockClass}">${product.stock}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Función para cargar todos los pedidos (para orders.html)
function loadAllOrders(searchTerm = '') { 
    const ordersTable = document.getElementById('orders-table');
    if (!ordersTable) return;

    const tbody = ordersTable.querySelector('tbody');
    tbody.innerHTML = '';

    const sortedOrders = [...mockData.orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const filteredOrders = sortedOrders.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredOrders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;">No se encontraron pedidos que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        
        let statusBadge;
        if (order.status === 'completed') {
            statusBadge = '<span class="badge badge-success">Completado</span>';
        } else if (order.status === 'processing') {
            statusBadge = '<span class="badge badge-warning">Procesando</span>';
        } else {
            statusBadge = '<span class="badge badge-danger">Cancelado</span>';
        }
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${statusBadge}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-primary btn-sm">Ver</button>
                    <button class="btn btn-success btn-sm">Procesar</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Función para cargar todos los clientes (clientes.html)
function loadAllClients(searchTerm = '') { 
    const clientsTable = document.getElementById('client-list');
    if (!clientsTable) return;

    const tbody = clientsTable.querySelector('tbody');
    tbody.innerHTML = '';

    const filteredClients = mockData.clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredClients.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No se encontraron clientes que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    filteredClients.forEach(client => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${new Date(client.registrationDate).toLocaleDateString()}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Función para cargar productos en inventario (inventario.html)
function loadInventoryProducts(searchTerm = '') { 
    const inventoryTable = document.getElementById('inventory-list');
    if (!inventoryTable) return;

    const tbody = inventoryTable.querySelector('tbody');
    tbody.innerHTML = '';

    const filteredProducts = mockData.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;">No se encontraron productos en inventario que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'fade-in';
        
        let stockBadgeClass = product.stock > 10 ? 'badge-success' : 
                                product.stock > 3 ? 'badge-warning' : 'badge-danger';
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td><span class="badge ${stockBadgeClass}">${product.stock}</span></td>
            <td>$${(product.price * 0.75).toFixed(2)}</td> <td>${new Date().toLocaleDateString()}</td> <td>
                <div class="btn-group">
                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });

    // Actualizar cards de resumen en Inventario (calculado sobre el total de mockData.products, no los filtrados)
    const allProductsInMockData = mockData.products; 
    const totalProductsOverall = allProductsInMockData.reduce((sum, p) => sum + p.stock, 0);
    const lowStockOverall = allProductsInMockData.filter(p => p.stock < 5).length;
    const totalInventoryValueOverall = allProductsInMockData.reduce((sum, p) => sum + (p.stock * p.price * 0.75), 0);


    const totalProductsCard = document.querySelector('.cards .card:nth-child(1) h1');
    if (totalProductsCard) totalProductsCard.textContent = totalProductsOverall;

    const lowStockCard = document.querySelector('.cards .card:nth-child(2) h1');
    if (lowStockCard) lowStockCard.textContent = lowStockOverall;

    const inventoryValueCard = document.querySelector('.cards .card:nth-child(3) h1');
    if (inventoryValueCard) inventoryValueCard.textContent = `$${totalInventoryValueOverall.toFixed(2)}`;
}

// Función para cargar datos de usuarios (configuracion.html)
function loadUsers(searchTerm = '') { 
    const userTable = document.getElementById('user-management-table');
    if (!userTable) return;

    const tbody = userTable.querySelector('tbody');
    tbody.innerHTML = '';

    const filteredUsers = mockData.users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredUsers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No se encontraron usuarios que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'fade-in';

        let statusBadgeClass = user.status === 'Activo' ? 'badge-success' : 'badge-warning';
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="badge ${statusBadgeClass}">${user.status}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-warning btn-sm"><i class="fas fa-user-edit"></i></button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-user-times"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para cargar datos de reportes (reportes.html) - solo tablas por ahora, gráficos requieren librería
function loadReportsData() {
    // Para el "Productos Más Vendidos (Top 5)"
    const topProductsTable = document.querySelector('#top-products-report-table tbody'); 
    if (topProductsTable) {
        topProductsTable.innerHTML = '';
        const sortedProducts = [...mockData.products].sort((a, b) => b.sales - a.sales).slice(0, 5);
        sortedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${product.name}</td><td>${product.sales}</td>`;
            topProductsTable.appendChild(row);
        });
    }

    // Actualizar cards de resumen en Reportes
    const totalClientsWithOrders = mockData.clients.filter(c => mockData.orders.some(o => o.customer === c.name && mockData.orders.filter(ord => ord.customer === c.name).length > 3)).length; 
    const newClientsThisMonth = mockData.clients.filter(c => new Date(c.registrationDate).getMonth() === new Date().getMonth()).length; 

    const recurringClientsText = document.querySelector('.main-content .cards .card:nth-child(3) p:nth-child(1) b');
    if(recurringClientsText) recurringClientsText.textContent = totalClientsWithOrders;

    const newClientsText = document.querySelector('.main-content .cards .card:nth-child(3) p:nth-child(2) b');
    if(newClientsText) newClientsText.textContent = newClientsThisMonth;

    const totalProductsInv = mockData.products.reduce((acc, prod) => acc + prod.stock, 0);
    const lowStockInv = mockData.products.filter(p => p.stock < 5).length;
    const outOfStockInv = mockData.products.filter(p => p.stock === 0).length;

    const productsInStockText = document.querySelector('.main-content .cards .card:nth-child(4) p:nth-child(1) b');
    if(productsInStockText) productsInStockText.textContent = totalProductsInv;

    const lowStockInvText = document.querySelector('.main-content .cards .card:nth-child(4) p:nth-child(2) b');
    if(lowStockInvText) lowStockInvText.textContent = lowStockInv;

    const outOfStockInvText = document.querySelector('.main-content .cards .card:nth-child(4) p:nth-child(3) b');
    if(outOfStockInvText) outOfStockInvText.textContent = outOfStockInv;

    // // Ejemplo de inicialización de Chart.js (requiere que Chart.js esté enlazado en reportes.html)
    // const salesCtx = document.getElementById('salesChart');
    // if (salesCtx) {
    //     new Chart(salesCtx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], // Datos simulados
    //             datasets: [{
    //                 label: 'Ventas ($)',
    //                 data: [12000, 19000, 30000, 5000, 20000, 25000],
    //                 backgroundColor: 'rgba(52, 152, 219, 0.6)',
    //                 borderColor: 'rgba(52, 152, 219, 1)',
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             scales: {
    //                 y: {
    //                     beginAtZero: true
    //                 }
    //             }
    //         }
    //     });
    // }
}


// =========================================================================
// Lógica de Modales y Formularios Específicos
// =========================================================================

// Función para manejar el modal de añadir/editar producto (products.html)
function setupProductModal() {
    const addProductBtn = document.getElementById('addProductBtn'); 
    const productModal = document.getElementById('add-product-modal'); // Corrected ID
    const closeProductModal = productModal ? productModal.querySelector('.close-modal') : null;
    const productForm = document.getElementById('add-product-form'); // Corrected ID

    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openModal(productModal));
    }

    if (productModal) {
        productModal.addEventListener('click', (e) => { 
            if (e.target === productModal) closeModal(productModal); 
        });
        if (closeProductModal) closeProductModal.addEventListener('click', () => closeModal(productModal));
    }

    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newProduct = {
                id: `PROD${String(mockData.products.length + 1).padStart(3, '0')}`,
                name: document.getElementById('product-name').value, // Corrected ID
                category: document.getElementById('product-category').value, // Corrected ID
                price: parseFloat(document.getElementById('product-price').value), // Corrected ID
                stock: parseInt(document.getElementById('product-stock').value), // Corrected ID
                description: document.getElementById('product-description').value, // Added description field
                sales: 0 // Nuevo producto inicia con 0 ventas
            };
            mockData.products.push(newProduct);
            loadAllProducts(); // Recargar la tabla de productos
            closeModal(productModal);
            alert('Producto guardado con éxito (simulado)!');
            this.reset(); // Limpiar formulario
        });
    }
}

// Función para manejar el modal de añadir/editar cliente (clientes.html)
function setupClientModal() {
    const addClientBtn = document.getElementById('addClientBtn');
    const clientModal = document.getElementById('clientModal');
    const closeClientModal = clientModal ? clientModal.querySelector('.close-modal') : null;
    const clientForm = document.getElementById('clientForm');

    if (addClientBtn) {
        addClientBtn.addEventListener('click', () => openModal(clientModal));
    }

    if (clientModal) {
        clientModal.addEventListener('click', (e) => { if (e.target === clientModal) closeModal(clientModal); });
        if (closeClientModal) closeClientModal.addEventListener('click', () => closeModal(clientModal));
    }

    if (clientForm) {
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newClient = {
                id: `CL${String(mockData.clients.length + 1).padStart(3, '0')}`,
                name: document.getElementById('clientName').value,
                email: document.getElementById('clientEmail').value,
                phone: document.getElementById('clientPhone').value,
                address: document.getElementById('clientAddress').value,
                registrationDate: new Date().toISOString().slice(0, 10)
            };
            mockData.clients.push(newClient);
            loadAllClients(); // Recargar la tabla de clientes
            closeModal(clientModal);
            alert('Cliente guardado con éxito (simulado)!');
            this.reset(); // Limpiar formulario
        });
    }
}

// Función para manejar el modal de añadir/editar producto en inventario (inventario.html)
function setupInventoryProductModal() {
    const addProductInventoryBtn = document.getElementById('addProductInventoryBtn');
    const inventoryProductModal = document.getElementById('inventoryProductModal');
    const closeInventoryProductModal = inventoryProductModal ? inventoryProductModal.querySelector('.close-modal') : null;
    const inventoryProductForm = document.getElementById('inventoryProductForm');

    if (addProductInventoryBtn) {
        addProductInventoryBtn.addEventListener('click', () => openModal(inventoryProductModal));
    }

    if (inventoryProductModal) {
        inventoryProductModal.addEventListener('click', (e) => { if (e.target === inventoryProductModal) closeModal(inventoryProductModal); });
        if (closeInventoryProductModal) closeInventoryProductModal.addEventListener('click', () => closeModal(inventoryProductModal));
    }

    if (inventoryProductForm) {
        inventoryProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newProduct = {
                id: `PROD${String(mockData.products.length + 1).padStart(3, '0')}`, // Reutiliza ID de producto
                name: document.getElementById('productNameInv').value,
                category: document.getElementById('productCategoryInv').value,
                stock: parseInt(document.getElementById('productStockInv').value),
                price: parseFloat(document.getElementById('productPurchasePriceInv').value / 0.75), // Reverse calculation for sale price
                sales: 0 // Nuevo producto empieza con 0 ventas
            };
            mockData.products.push(newProduct); // Añade al mismo array de productos
            loadInventoryProducts(); // Recargar la tabla de inventario
            closeModal(inventoryProductModal);
            alert('Producto de inventario guardado con éxito (simulado)!');
            this.reset();
        });
    }
}

// Función para manejar el modal de añadir/editar usuario (configuracion.html)
function setupUserModal() {
    const addUserBtn = document.getElementById('addUserBtn');
    const userModal = document.getElementById('userModal');
    const closeUserModal = userModal ? userModal.querySelector('.close-modal') : null;
    const userForm = document.getElementById('userForm');

    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => openModal(userModal));
    }

    if (userModal) {
        userModal.addEventListener('click', (e) => { if (e.target === userModal) closeModal(userModal); });
        if (closeUserModal) closeUserModal.addEventListener('click', () => closeModal(userModal));
    }

    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newUser = {
                id: `USR${String(mockData.users.length + 1).padStart(3, '0')}`,
                username: document.getElementById('username').value,
                email: document.getElementById('userEmail').value,
                role: document.getElementById('userRole').value,
                status: 'Activo' // Por defecto, nuevo usuario activo
            };
            mockData.users.push(newUser);
            loadUsers(); // Recargar la tabla de usuarios
            closeModal(userModal);
            alert('Usuario guardado con éxito (simulado)!');
            this.reset();
        });
    }
}


// Función para manejar el logout
function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                // En una aplicación real, aquí harías una petición al servidor
                alert('Sesión cerrada. Redirigiendo...');
                // window.location.href = 'login.html'; // Descomenta para redirigir
            }
        });
    }
}

// =========================================================================
// Inicialización General
// =========================================================================

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos y configurar modales/búsqueda según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        loadRecentOrders();
        loadTopProducts();
    } else if (currentPage === 'products.html') {
        loadAllProducts();
        setupProductModal(); // <-- ¡Asegura que el modal de productos se inicialice!
        
        const productSearchInput = document.getElementById('productSearchInput');
        const productCategoryFilter = document.getElementById('productCategoryFilter'); // Get the category filter element

        // Event listener for search input
        if (productSearchInput) {
            productSearchInput.addEventListener('keyup', () => {
                const searchTerm = productSearchInput.value;
                const categoryFilter = productCategoryFilter.value; // Get current category filter value
                loadAllProducts(searchTerm, categoryFilter); // Pass both search term and category
            });
        }
        // Event listener for category filter
        if (productCategoryFilter) {
            productCategoryFilter.addEventListener('change', () => {
                const searchTerm = productSearchInput.value;
                const categoryFilter = productCategoryFilter.value;
                loadAllProducts(searchTerm, categoryFilter); // Pass both search term and category
            });
        }

    } else if (currentPage === 'orders.html') {
        loadAllOrders();
        const orderSearchInput = document.getElementById('orderSearchInput'); 
        if (orderSearchInput) {
            orderSearchInput.addEventListener('keyup', (event) => {
                loadAllOrders(event.target.value); 
            });
        }
        // setupOrderModal(); // Si tienes un modal para pedidos, inicialízalo aquí
    } else if (currentPage === 'clientes.html') {
        loadAllClients();
        setupClientModal(); 
        
        const clientSearchInput = document.getElementById('clientSearchInput'); 
        if (clientSearchInput) {
            clientSearchInput.addEventListener('keyup', (event) => {
                loadAllClients(event.target.value); 
            });
        }
    } else if (currentPage === 'inventario.html') {
        loadInventoryProducts();
        setupInventoryProductModal(); 
        
        const inventorySearchInput = document.getElementById('inventorySearchInput'); 
        if (inventorySearchInput) {
            inventorySearchInput.addEventListener('keyup', (event) => {
                loadInventoryProducts(event.target.value); 
            });
        }
    } else if (currentPage === 'reportes.html') {
        loadReportsData();
    } else if (currentPage === 'configuracion.html') {
        loadUsers();
        setupUserModal(); 
        
        const userSearchInput = document.getElementById('userSearchInput'); 
        if (userSearchInput) {
            userSearchInput.addEventListener('keyup', (event) => {
                loadUsers(event.target.value); 
            });
        }
    }
    
    // Configurar logout (siempre debe estar disponible)
    setupLogout();
    
    // Resaltar elemento activo en el menú
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        item.parentElement.classList.remove('active'); 
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.parentElement.classList.add('active');
        }
    });
});