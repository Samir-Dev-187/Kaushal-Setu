import React from 'react';
import { Link } from 'react-router-dom';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Bell,
  Check,
  ExternalLink,
  AlertTriangle,
  FileText,
  Users,
  Wrench,
  Radio,
  Clock
} from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationCount
  } = useTrainingCentre();

  if (!isNotificationsOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government':
        return <FileText className="w-4 h-4 text-red-600" />;
      case 'AI Intelligence':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'Trainer':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'Equipment':
        return <Wrench className="w-4 h-4 text-amber-700" />;
      case 'Industry':
      default:
        return <Radio className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsNotificationsOpen(false)}
      ></div>

      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-900" />
            <h3 className="font-bold text-sm text-[#0C2340]">Notifications Centre</h3>
            {unreadNotificationCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                {unreadNotificationCount} new
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {unreadNotificationCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-blue-700 hover:underline font-semibold"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md font-bold text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No notifications at this time.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-xl transition-all mb-1.5 flex items-start space-x-3 ${
                  !notif.isRead ? 'bg-blue-50/60 border border-blue-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200 uppercase">
                      {notif.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{notif.timestamp}</span>
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                    {notif.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-1 text-[11px]">
                    {notif.linkTarget ? (
                      <Link
                        to={notif.linkTarget}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          setIsNotificationsOpen(false);
                        }}
                        className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Take Action</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span></span>
                    )}

                    {!notif.isRead && (
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="text-slate-400 hover:text-slate-700 flex items-center gap-0.5"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Mark read</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer View All */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
          <Link
            to="/training-centres/notifications"
            onClick={() => setIsNotificationsOpen(false)}
            className="text-xs font-bold text-blue-900 hover:underline"
          >
            View Full Notification History &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
