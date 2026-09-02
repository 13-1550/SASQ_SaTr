import React from 'react';

const Navbar = ({ userName = "Mohammed" }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* القسم الأيمن: العنوان أو الشعار */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-[#037C43] tracking-wide">
          SAUDIA
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 bg-[#AFEFBA] text-[#15641A] rounded-full">
          Portal
        </span>
      </div>

      {/* القسم الأيسر: الإشعارات ومعلومات المستخدم */}
      <div className="flex items-center gap-4">
        {/* زر الإشعارات */}
        <button className="p-2 text-[#525253] hover:bg-[#F8F8F8] rounded-xl transition-colors relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* نقطة تنبيه حمراء */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#BB271A] rounded-full"></span>
        </button>

        {/* فاصل عمودي */}
        <div className="h-6 w-[1px] bg-[#B7B7B7]"></div>

        {/* بروفایل المستخدم */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#037C43] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-[#000000]">{userName}</p>
            <p className="text-xs text-[#525253]">System Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;