import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBr from "@fullcalendar/core/locales/pt-br";

function CalendarWidget() {
  return (
    <div className="p-4 sm:p-6 rounded-2xl w-full h-full">
      <style>{`
        .fc {
          --fc-border-color: var(--line);
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: var(--elevated);
          --fc-today-bg-color: rgba(37, 99, 235, 0.12);
          color: var(--fg);
        }
        .fc .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--fg);
          text-transform: capitalize;
        }
        .fc .fc-col-header-cell-cushion {
          color: var(--muted);
          font-weight: 600;
          text-transform: capitalize;
          padding: 8px 4px;
        }
        .fc .fc-daygrid-day-number {
          color: var(--fg);
          padding: 6px 8px;
        }
        .fc .fc-day-other .fc-daygrid-day-number {
          color: var(--faint);
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border-color: var(--line);
        }
        .fc-theme-standard .fc-scrollgrid {
          border-color: var(--line);
          border-radius: 12px;
          overflow: hidden;
        }
        /* Botões */
        .fc .fc-button-primary {
          background: linear-gradient(to right, #2563eb, #4f46e5);
          border: none;
          border-radius: 10px;
          padding: 8px 14px;
          font-weight: 600;
          text-transform: capitalize;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          transition: all 0.2s ease;
        }
        .fc .fc-button-primary:hover {
          background: linear-gradient(to right, #3b82f6, #6366f1);
        }
        .fc .fc-button-primary:disabled {
          background: var(--elevated);
          color: var(--faint);
          box-shadow: none;
          opacity: 0.7;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background: #1d4ed8;
        }
        .fc .fc-button:focus,
        .fc .fc-button-primary:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
        }
        .fc .fc-daygrid-day.fc-day-today {
          border-radius: 6px;
        }
        .fc-event {
          border-radius: 6px;
          border: none;
          padding: 2px 4px;
          font-weight: 500;
        }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptBr}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        height="100%"
        contentHeight="auto"
        expandRows={true}
      />
    </div>
  );
}

export default CalendarWidget;
