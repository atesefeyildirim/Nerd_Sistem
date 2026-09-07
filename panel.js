
const aktifKullanici = localStorage.getItem("aktifKullanici") || "Ateş";
const isAdmin = aktifKullanici === "Ateş";

const karsilamaEl = document.getElementById("kullaniciKarsilama");
if (karsilamaEl) {
    karsilamaEl.innerText = `Giriş Yapan: ${aktifKullanici}`;
}

const gunler = [
    { id: "pazartesi", isim: "Pazartesi" },
    { id: "sali", isim: "Salı" },
    { id: "carsamba", isim: "Çarşamba" },
    { id: "persembe", isim: "Perşembe" },
    { id: "cuma", isim: "Cuma" },
    { id: "cumartesi", isim: "Cumartesi" },
    { id: "pazar", isim: "Pazar" }
];


function gridOlustur() {
    const haftaGrid = document.getElementById("haftaGrid");
    if (!haftaGrid) return;

    haftaGrid.innerHTML = "";

    gunler.forEach(gun => {
        const gunKutusu = document.createElement("div");
        gunKutusu.className = "gun-kutusu";
        
        gunKutusu.innerHTML = `
            <h3>${gun.isim}</h3>
            ${isAdmin ? `
                <div class="gorev-ekle-form">
                    <input type="text" id="input-${gun.id}" placeholder="Görev yaz...">
                    <button onclick="gorevEkle('${gun.id}')">Ekle</button>
                </div>
            ` : ""}
            <ul class="gorev-listesi" id="liste-${gun.id}"></ul>
        `;
        haftaGrid.appendChild(gunKutusu);
    });
}


gridOlustur();


const firebaseConfig = {
apiKey: "AIzaSyDcEwjA0nKgN8soNjN2jytLdKX83xLzeas",
  authDomain: "nerd-sistem.firebaseapp.com",
  projectId: "nerd-sistem",
  storageBucket: "nerd-sistem.firebasestorage.app",
  messagingSenderId: "753232702809",
  appId: "1:753232702809:web:9d28c8785c88c797fb7048",
  measurementId: "G-547LGYQW08"
};


let db = null;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    
    // Veritabanını Dinle
    db.ref("gorevler").on("value", (snapshot) => {
        const tumGorevler = snapshot.val() || {};
        
        gunler.forEach(gun => {
            const listeEl = document.getElementById(`liste-${gun.id}`);
            if (!listeEl) return;

            listeEl.innerHTML = "";
            const gunGorevleri = tumGorevler[gun.id] || {};

            Object.keys(gunGorevleri).forEach(id => {
                const gorev = gunGorevleri[id];
                const li = document.createElement("li");

                li.innerHTML = `
                    <div class="gorev-sol">
                        <input type="checkbox" ${gorev.tamamlandi ? "checked" : ""} onchange="durumDegistir('${gun.id}', '${id}', this.checked)">
                        <span>${gorev.metin}</span>
                    </div>
                    ${isAdmin ? `<button class="sil-btn" onclick="gorevSil('${gun.id}', '${id}')">Sil</button>` : ""}
                `;
                listeEl.appendChild(li);
            });
        });
    });
} catch (error) {
    console.log("Firebase henüz yapılandırılmadı, arayüz yerel çalışıyor.");
}


function gorevEkle(gunId) {
    if (!isAdmin) return;
    const input = document.getElementById(`input-${gunId}`);
    if (!input) return;
    const metin = input.value.trim();

    if (metin !== "") {
        if (db) {
            db.ref(`gorevler/${gunId}`).push({
                metin: metin,
                tamamlandi: false
            });
        }
        input.value = "";
    }
}


function durumDegistir(gunId, gorevId, yeniDurum) {
    if (db) {
        db.ref(`gorevler/${gunId}/${gorevId}`).update({
            tamamlandi: yeniDurum
        });
    }
}


function gorevSil(gunId, gorevId) {
    if (!isAdmin) return;
    if (db) {
        db.ref(`gorevler/${gunId}/${gorevId}`).remove();
    }
}

function cikisYap() {
    localStorage.removeItem("aktifKullanici");
    window.location.href = "index.html";
}
