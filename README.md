# Geri Kazan

```
Geri Kazan, tüketiciler ile geri dönüşüm işçilerini ortak paydada buluşmaya davet eden, geri dönüşüme katkı 
sağlamayı kolaylaştıran bir mobil uygulama projesidir.
```

<img src="https://user-images.githubusercontent.com/43846857/197409302-6309c4d3-b522-4275-8614-b22a582579fa.png" />

## İçerik
* [Uygulama Görselleri](#uygulama-görselleri)
* [Uygulama Özellikleri](#uygulama-özellikleri)
* [Gereksinimler](#gereksinimler)
* [Kurulum](#kurulum)
* [Geliştirme Süreci](#geliştirme-süreci)

## Uygulama Görselleri
<img src="https://user-images.githubusercontent.com/43846857/197409306-f474dee9-7bab-4c17-b748-63faf3ca4c9d.png" />
<img src="https://user-images.githubusercontent.com/43846857/197409305-4aff556a-2289-4bad-9813-5577b93f2401.png" />
<img src="https://user-images.githubusercontent.com/43846857/197409304-255bbc25-58fa-4e63-abc2-ea46d1f22038.png" />

## Uygulama Özellikleri
* Intro Sayfaları
* Kayıt Ol & Giriş Yap Sayfaları
* Ana Sayfa
  * İlanları listeleme
  * İlan arama
  * Ürün filtreleme
  * Favorilere ekleme / çıkarma (Persist)
  * Pull to refresh
  * Detay sayfasına erişim
  
* İlan Detay Sayfası
  * İlan özelliklerini görüntüleme
  * Favorilere ekleme / çıkarma (Persist)
  * Carousel
  * Ürün Report
  * İlan sahibine mesaj gönderme
  * Ürün silme (İlan sahibi için)

* Favoriler Sayfası
  * Favorileri listeleme
  * Detay sayfasına erişim
  * Favorilere ekleme / çıkarma (Persist)
  * Pull to refresh
  
* İlan Ekleme Sayfası
  * Resim ekleme
  * Ürün detaylarını girme
  * İl - İlçe seçimi
  * Ücretsiz ilan / ücret girişi
 
* Mesajlar Sayfası
  * Mesajlaşılan kullanıcıları ve son mesajları görme
  * Mesaj detay sayfasına erişim
 
* Mesaj Detay Sayfası
  * Anlık mesajlaşma
  
* Hesabım Sayfası
  * Profilim, Ürünlerim, Favorilerim, Hakkında, Geri Bildirim sayfalarına erişim.
  * Hesabı kalıcı olarak silme işlemi
  * Oturumu kapatma işlemi
 
* Profilim Sayfası
  * Kullanıcı bilgilerinin değiştirilebilmesi
  * Profil fotoğrafı ekleme / değiştirme
  
* Ürünlerim Sayfası
  * Hesap sahibine ait ürünler
  * Ürün silme
  * Ürün detay sayfasına erişim
  
* Hakkında Sayfası
  * Uygulama hakkında bilgiler
  * Uygulama sosyal medya hesaplarına erişim
  
* Geri Bildirim Sayfası
  * Uygulama hakkında geri bildirim gönderme
  


## Gereksinimler
<b>Önemli Not:</b> Uygulama cihaz bulunmadığı için iOS işletim sistemi üzerinde çalıştırılamamış ve konfigürasyonları yapılamamıştır.
 ### :arrow_right: Android  
 * [Node](https://nodejs.org/)
 * [Java SE Development Kit (JDK)](https://openjdk.java.net/projects/jdk/11/)
 * [Android Studio](https://developer.android.com/studio)

## Kurulum
<b>Önemli Not:</b> Uygulama cihaz bulunmadığı için iOS üzerinde çalıştırılamamış ve konfigürasyonları yapılamamıştır.
### :arrow_right: Android 
Terminal üzerinde
```sh
git clone https://github.com/aslihanturkdonmez/geriKazan.git
cd geriKazan
npm install
npx react-native run-android
```
komutları çalıştırılmalıdır

## Geliştirme Süreci
* Geliştirme Ortamı: [React Native](https://reactnative.dev/)
* State Management: [Redux](https://redux.js.org/)
* Navigation: [React Navigation](https://reactnavigation.org)
* Animasyon: [Lottie](https://github.com/lottie-react-native/lottie-react-native) 
* Veritabanı [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore)
* Storage: [Firebase Cloud Storage](https://firebase.google.com/docs/storage)
* Authentication: [Firebase Authentication](https://firebase.google.com/docs/auth)
