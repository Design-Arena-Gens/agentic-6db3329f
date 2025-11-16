'use client';

import { useState } from 'react';
import {
  MessageSquare,
  TrendingUp,
  Users,
  BarChart3,
  Lightbulb,
  Calendar,
  Hash,
  Image as ImageIcon,
  Send
} from 'lucide-react';

type ToolType = 'caption' | 'hashtag' | 'analytics' | 'content' | 'schedule' | 'engagement';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const tools = [
    {
      id: 'caption' as ToolType,
      title: 'تولید کپشن',
      description: 'ایجاد کپشن‌های جذاب و حرفه‌ای',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'hashtag' as ToolType,
      title: 'پیشنهاد هشتگ',
      description: 'هشتگ‌های مناسب برای محتوا',
      icon: Hash,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'analytics' as ToolType,
      title: 'تحلیل عملکرد',
      description: 'بررسی آمار و عملکرد پست‌ها',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'content' as ToolType,
      title: 'ایده محتوا',
      description: 'پیشنهاد ایده برای محتوای جدید',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'schedule' as ToolType,
      title: 'برنامه‌ریزی پست',
      description: 'بهترین زمان انتشار محتوا',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'engagement' as ToolType,
      title: 'افزایش تعامل',
      description: 'استراتژی‌های افزایش اینگیجمنت',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const getToolResponse = (tool: ToolType, userInput: string): string => {
    const responses: Record<ToolType, string> = {
      caption: `📝 **کپشن پیشنهادی:**

"${userInput}"

این کپشن را برای شما بهبود می‌دهم:

✨ **نسخه بهبود یافته:**
"${userInput} 🌟

${generateCaptionTips(userInput)}

💡 **نکات کلیدی:**
• از ایموجی برای جذابیت بیشتر استفاده کنید
• سوال از مخاطب برای افزایش تعامل
• فراخوان به اقدام (CTA) واضح
• استوری تعریف کنید تا احساسی شود`,

      hashtag: `🏷️ **هشتگ‌های پیشنهادی برای "${userInput}":**

**🔥 هشتگ‌های پرطرفدار:**
#اینستاگرام #محتوا #کسب_و_کار #دیجیتال_مارکتینگ #ایران

**🎯 هشتگ‌های هدفمند:**
${generateHashtags(userInput)}

**💡 نکات استفاده از هشتگ:**
• از 10-15 هشتگ استفاده کنید
• ترکیبی از هشتگ‌های بزرگ و کوچک
• هشتگ‌های مرتبط با حوزه کاری خود
• هشتگ‌های محلی برای مخاطبان ایرانی`,

      analytics: `📊 **تحلیل عملکرد:**

**📈 معیارهای کلیدی برای پیگیری:**
• نرخ تعامل (Engagement Rate): 3-5% عالی است
• رشد فالوور: ثبات مهم‌تر از سرعت است
• ذخیره و اشتراک‌گذاری: نشانه محتوای با ارزش
• زمان بیشترین حضور فالوورها

**🎯 توصیه‌ها:**
• محتوای شما در ساعت 18-21 بهترین بازدهی را دارد
• پست‌های ویدیویی 40% تعامل بیشتری دارند
• استوری روزانه باعث افزایش 25% تعامل می‌شود
• پاسخ به کامنت‌ها در 2 ساعت اول حیاتی است`,

      content: `💡 **ایده‌های محتوا برای "${userInput}":**

**🎬 انواع محتوای پیشنهادی:**

1️⃣ **محتوای آموزشی:**
   • نکات و ترفندهای حوزه کاری
   • راهنمای گام به گام
   • پاسخ به سوالات متداول

2️⃣ **محتوای سرگرم‌کننده:**
   • پشت صحنه کسب و کار
   • داستان‌های موفقیت مشتریان
   • چالش‌ها و مسابقات

3️⃣ **محتوای تعاملی:**
   • نظرسنجی و کوئیز
   • سوال و جواب
   • این یا آن (This or That)

4️⃣ **محتوای الهام‌بخش:**
   • نقل قول‌های انگیزشی
   • داستان برند
   • ارزش‌های کسب و کار`,

      schedule: `📅 **برنامه زمانی انتشار محتوا:**

**⏰ بهترین زمان‌های پست:**
• شنبه تا چهارشنبه: 18:00 - 21:00
• پنج‌شنبه: 16:00 - 19:00
• جمعه: 12:00 - 15:00

**📊 برنامه هفتگی پیشنهادی:**
• شنبه: پست آموزشی + استوری
• یکشنبه: محتوای تعاملی
• دوشنبه: پشت صحنه + استوری
• سه‌شنبه: معرفی محصول/خدمات
• چهارشنبه: پست الهام‌بخش
• پنج‌شنبه: نظرسنجی و سوال
• جمعه: محتوای سرگرم‌کننده

**💡 نکته:** فاصله بین پست‌ها حداقل 6-8 ساعت باشد`,

      engagement: `🚀 **استراتژی افزایش تعامل:**

**💬 تکنیک‌های تعامل:**

1️⃣ **در کپشن:**
   • سوال بپرسید
   • نظر مخاطب را جویا شوید
   • از دستورات اقدام استفاده کنید

2️⃣ **در کامنت‌ها:**
   • به همه کامنت‌ها پاسخ دهید
   • در 2 ساعت اول فعال باشید
   • سوالات بپرسید

3️⃣ **در استوری:**
   • از استیکرهای تعاملی استفاده کنید
   • نظرسنجی روزانه
   • سوال و جواب هفتگی

4️⃣ **محتوای قابل ذخیره:**
   • اینفوگرافیک
   • چک‌لیست
   • راهنماهای گام به گام

**📈 نتیجه:** با این روش‌ها تعامل شما 50-100% افزایش می‌یابد`,
    };

    return responses[tool];
  };

  const generateCaptionTips = (input: string): string => {
    const tips = [
      'محصول/خدمت خود را با جزئیات معرفی کنید',
      'ارزش پیشنهادی منحصر به فرد خود را مشخص کنید',
      'داستانی کوتاه و جذاب تعریف کنید',
      'احساسات مخاطب را درگیر کنید'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const generateHashtags = (input: string): string => {
    const hashtags = [
      '#آموزش #محتوا_سازی #سوشال_مدیا',
      '#دیجیتال #برندینگ #مارکتینگ',
      '#کسب_وکار_آنلاین #فروش #استارتاپ',
      '#تهران #ایران #فارسی'
    ];
    return hashtags.join('\n');
  };

  const handleSendMessage = () => {
    if (!input.trim() || !selectedTool) return;

    const userMessage: Message = { role: 'user', content: input };
    const assistantMessage: Message = {
      role: 'assistant',
      content: getToolResponse(selectedTool, input)
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                دستیار سوشال مدیا
              </h1>
              <p className="text-sm text-gray-600">متخصص اینستاگرام شما</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!selectedTool ? (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                چطور می‌تونم کمکتون کنم؟
              </h2>
              <p className="text-gray-600">ابزار مورد نیاز خود را انتخاب کنید</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => {
                setSelectedTool(null);
                setMessages([]);
                setInput('');
              }}
              className="mb-6 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700"
            >
              ← بازگشت به منوی اصلی
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className={`bg-gradient-to-r ${tools.find(t => t.id === selectedTool)?.color} p-6 text-white`}>
                <h2 className="text-2xl font-bold">
                  {tools.find(t => t.id === selectedTool)?.title}
                </h2>
                <p className="text-white/90 mt-1">
                  {tools.find(t => t.id === selectedTool)?.description}
                </p>
              </div>

              <div className="p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-20">
                    <p>سوال یا درخواست خود را بنویسید...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          }`}
                        >
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {message.content}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      input.trim()
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-600">
        <p className="text-sm">ساخته شده با ❤️ برای موفقیت شما در اینستاگرام</p>
      </footer>
    </div>
  );
}
