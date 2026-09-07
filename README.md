# Nerd System — Programlı Olma ve Görev Takip Paneli

Nerd System, haftalık plan ve görev takibini sistematik şekilde yönetmek için tasarlanmış istemci taraflı (client-side) bir web uygulamasıdır.

---

## ⚙️ İşlevsel Özellikler

* **Rol Tabanlı Yetkilendirme:**
  * **Ateş (Admin):** Tüm günlere yeni görev ekleyebilir, mevcut görevleri silebilir ve tamamlama durumunu değiştirebilir.
  * **Ecem (Kullanıcı):** Görev listelerini görüntüler ve tamamladığı görevlerin durumunu (check/uncheck) işaretleyebilir.
* **Veri Saklama & Durum Yönetimi:**
  * Görev verileri, durum bilgileri (`tamamlandi: true/false`) ve gün eşleşmeleri JSON formatında `localStorage` üzerinde saklanır.
  * Sayfa yenilendiğinde veya oturum yeniden açıldığında veriler korunur.
* **Dinamik Arayüz Güncellemesi:**
  * Görev ekleme, silme veya durum değiştirme işlemlerinde DOM dinamik olarak yeniden işlenir (re-render).
* **Metin ve Taşma Koruması:**
  * Uzun görev metinlerinde butonların ve onay kutularının kaybolmasını engelleyen esnek kutu yapısı (`word-break`, `flex-shrink`).

---

## Dosya ve Kod Mimarisi

```text
.
├── index.html   # Giriş doğrulaması ve oturum başlatma
├── panel.html   # 7 günlük görev tablosu iskeleti
├── panel.js     # Rol kontrolü, localStorage işlemleri ve CRUD fonksiyonları
└── style.css    # Responsive grid düzeni ve layout kuralları
