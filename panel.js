const aktifKullanici = localStorage.getItem("aktifKullanici");

if (!aktifKullanici) {
    window.location.href = "index.html";
}

const gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
const haftaGrid = document.getElementById("haftaGrid");

let programVerisi = JSON.parse(localStorage.getItem("yksProgrami")) || {};

function ekraniCiz() {
    haftaGrid.innerHTML = "";
    
    gunler.forEach(gun => {
        const gunKutusu = document.createElement("div");
        gunKutusu.className = "gun-kutusu";
        
        let ekleFormu = "";
        if (aktifKullanici === "Ateş") {
            ekleFormu = `
                <div class="gorev-ekle-form">
                    <input type="text" id="input-${gun}" placeholder="Ders/Konu yaz...">
                    <button onclick="gorevEkle('${gun}')">Ekle</button>
                </div>
            `;
        }

        const gunGorevleri = programVerisi[gun] || [];
        let listeHTML = "";
        
        gunGorevleri.forEach((item, index) => {
            const checked = item.tamamlandi ? "checked" : "";
            const usticizili = item.tamamlandi ? "text-decoration: line-through; opacity: 0.5;" : "";
            
            let silButonu = "";
            if (aktifKullanici === "Ateş") {
                silButonu = `<button onclick="gorevSil('${gun}', ${index})" class="sil-btn">Sil</button>`;
            }

            listeHTML += `
                <li>
                    <div class="gorev-sol">
                        <input type="checkbox" ${checked} onchange="durumDegistir('${gun}', ${index})">
                        <span style="${usticizili}">${item.metin}</span>
                    </div>
                    ${silButonu}
                </li>
            `;
        });

        gunKutusu.innerHTML = `
            <h3>${gun}</h3>
            ${ekleFormu}
            <ul class="gorev-listesi">${listeHTML}</ul>
        `;
        
        haftaGrid.appendChild(gunKutusu);
    });
}

function gorevEkle(gun) {
    const input = document.getElementById(`input-${gun}`);
    const metin = input.value.trim();
    if (!metin) return;

    if (!programVerisi[gun]) programVerisi[gun] = [];
    programVerisi[gun].push({ metin: metin, tamamlandi: false });

    localStorage.setItem("yksProgrami", JSON.stringify(programVerisi));
    ekraniCiz();
}

function gorevSil(gun, index) {
    programVerisi[gun].splice(index, 1);
    localStorage.setItem("yksProgrami", JSON.stringify(programVerisi));
    ekraniCiz();
}

function durumDegistir(gun, index) {
    programVerisi[gun][index].tamamlandi = !programVerisi[gun][index].tamamlandi;
    localStorage.setItem("yksProgrami", JSON.stringify(programVerisi));
    ekraniCiz();
}

function cikisYap() {
    localStorage.removeItem("aktifKullanici");
    window.location.href = "index.html";
}

ekraniCiz();
