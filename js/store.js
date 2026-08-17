const DB_KEY = "algerian_store_db_data";

// جلب البيانات (من التخزين المحلي أولاً ثم من ملف data/store-data.json)
async function StoreDB_load() {
    const local = localStorage.getItem(DB_KEY);
    if (local) {
        return JSON.parse(local);
    }
    try {
        const res = await fetch('data/store-data.json');
        const data = await res.json();
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        return data;
    } catch (e) {
        console.error("لم يتم العثور على data/store-data.json", e);
        return { categories: [], products: [], shippingPrices: {}, orders: [] };
    }
}

// حفظ البيانات المحدثة
function StoreDB_save(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// إضافة طلب جديد حقيقي من الواجهة
async function StoreDB_addOrder(newOrder) {
    const db = await StoreDB_load();
    db.orders.unshift(newOrder);
    StoreDB_save(db);
}