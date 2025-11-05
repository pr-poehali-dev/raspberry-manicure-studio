import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const services = [
  { id: 1, name: 'Классический маникюр', price: '1500 ₽', duration: '60 мин', icon: 'Sparkles' },
  { id: 2, name: 'Аппаратный маникюр', price: '1800 ₽', duration: '70 мин', icon: 'Zap' },
  { id: 3, name: 'Маникюр с покрытием', price: '2200 ₽', duration: '90 мин', icon: 'Palette' },
  { id: 4, name: 'Наращивание ногтей', price: '3500 ₽', duration: '120 мин', icon: 'Star' },
  { id: 5, name: 'Дизайн ногтей', price: 'от 500 ₽', duration: '30 мин', icon: 'Paintbrush' },
  { id: 6, name: 'SPA-уход для рук', price: '2000 ₽', duration: '60 мин', icon: 'Heart' },
];

const masters = [
  {
    id: 1,
    name: 'Анна Смирнова',
    specialization: 'Мастер маникюра',
    experience: '5 лет опыта',
    description: 'Специализируется на сложном дизайне и наращивании',
  },
  {
    id: 2,
    name: 'Елена Петрова',
    specialization: 'Топ-мастер',
    experience: '7 лет опыта',
    description: 'Эксперт в классическом и аппаратном маникюре',
  },
  {
    id: 3,
    name: 'Мария Козлова',
    specialization: 'Мастер маникюра',
    experience: '4 года опыта',
    description: 'Создает нежные и романтичные дизайны',
  },
];

const galleryImages = [
  'https://cdn.poehali.dev/projects/6f417edb-81dd-4816-ac86-8daeb6d727cd/files/d26c5db9-ba1a-4205-baa6-a331248dd441.jpg',
  'https://cdn.poehali.dev/projects/6f417edb-81dd-4816-ac86-8daeb6d727cd/files/3ca33f68-c612-48fd-90d4-fae2ce0ca23f.jpg',
  'https://cdn.poehali.dev/projects/6f417edb-81dd-4816-ac86-8daeb6d727cd/files/fa353a12-3f9f-4cfc-a79f-f4650c987807.jpg',
];

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingData, setBookingData] = useState({
    service: '',
    master: '',
    date: '',
    time: '',
    name: '',
    phone: '',
  });
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = () => {
    if (!bookingData.service || !bookingData.master || !bookingData.date || !bookingData.time || !bookingData.name || !bookingData.phone) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, заполните все обязательные поля для записи',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Запись успешно создана! 🎉',
      description: `Вы записаны на ${bookingData.date} в ${bookingData.time}`,
    });
    
    setBookingData({
      service: '',
      master: '',
      date: '',
      time: '',
      name: '',
      phone: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💅</span>
              <h1 className="text-2xl font-heading font-bold text-primary">Малина</h1>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'services', label: 'Услуги' },
                { id: 'masters', label: 'Мастера' },
                { id: 'gallery', label: 'Галерея' },
                { id: 'contacts', label: 'Контакты' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="font-heading">Записаться</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl">Онлайн-запись</DialogTitle>
                  <DialogDescription>
                    Выберите услугу, мастера и удобное время
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Услуга</Label>
                    <Select value={bookingData.service} onValueChange={(value) => setBookingData({ ...bookingData, service: value })}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.name} — {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="master">Мастер</Label>
                    <Select value={bookingData.master} onValueChange={(value) => setBookingData({ ...bookingData, master: value })}>
                      <SelectTrigger id="master">
                        <SelectValue placeholder="Выберите мастера" />
                      </SelectTrigger>
                      <SelectContent>
                        {masters.map((master) => (
                          <SelectItem key={master.id} value={master.name}>
                            {master.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Время</Label>
                    <Select value={bookingData.time} onValueChange={(value) => setBookingData({ ...bookingData, time: value })}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Введите ваше имя"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    />
                  </div>

                  <Button className="w-full font-heading" size="lg" onClick={handleBooking}>
                    Подтвердить запись
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                Студия маникюра <span className="text-primary">Малина</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Создаём нежные и романтичные образы для ваших ручек. Профессиональный уход и дизайн в уютной атмосфере
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="font-heading" onClick={() => scrollToSection('services')}>
                  Наши услуги
                </Button>
                <Button size="lg" variant="outline" className="font-heading" onClick={() => scrollToSection('contacts')}>
                  Контакты
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/6f417edb-81dd-4816-ac86-8daeb6d727cd/files/fa353a12-3f9f-4cfc-a79f-f4650c987807.jpg"
                alt="Студия Малина"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-heading font-bold">5+</p>
                <p className="text-sm">лет опыта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Наши услуги</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Профессиональный маникюр и уход за руками с использованием качественных материалов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={24} />
                  </div>
                  <CardTitle className="font-heading">{service.name}</CardTitle>
                  <CardDescription>{service.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-heading font-bold text-primary">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="masters" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Наши мастера</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Профессионалы своего дела с многолетним опытом и любовью к работе
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {masters.map((master, index) => (
              <Card key={master.id} className="text-center hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon name="User" size={40} className="text-primary" />
                  </div>
                  <CardTitle className="font-heading">{master.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{master.specialization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{master.experience}</p>
                  <p className="text-sm">{master.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Галерея работ</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Примеры наших работ — вдохновляйтесь и выбирайте свой дизайн
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <img
                  src={image}
                  alt={`Работа ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-heading">Наша работа #{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">
                Приходите к нам и убедитесь в качестве наших услуг
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>г. Москва, ул. Примерная, д. 10</p>
                  <p className="text-sm text-muted-foreground mt-2">Ежедневно с 10:00 до 20:00</p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">+7 (999) 123-45-67</p>
                  <p className="text-sm text-muted-foreground mt-2">Звоните или пишите в WhatsApp</p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="Mail" className="text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>info@malina-studio.ru</p>
                  <p className="text-sm text-muted-foreground mt-2">Ответим в течение 24 часов</p>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle className="font-heading flex items-center gap-2">
                    <Icon name="Instagram" className="text-primary" />
                    Instagram
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>@malina_nails</p>
                  <p className="text-sm text-muted-foreground mt-2">Следите за нашими новинками</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-secondary/50 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">💅</span>
            <h3 className="text-2xl font-heading font-bold text-primary">Малина</h3>
          </div>
          <p className="text-muted-foreground mb-4">Студия маникюра</p>
          <p className="text-sm text-muted-foreground">© 2024 Малина. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
