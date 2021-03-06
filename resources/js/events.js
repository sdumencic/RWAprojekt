// Description: Collection of custom made functions to render and interact with
//              the Full Calendar JS library.

// IMPORTS ////////////////////////////////////////////////////////////////////
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import "@fortawesome/fontawesome-free/css/all.css";
import * as moment from "moment-timezone";

// IMPORTS ////////////////////////////////////////////////////////////////////

// Code ///////////////////////////////////////////////////////////////////////
let options = {
    title: "",
    start: "",
    end: "",
    userId: "",
    id: ""
};

let calendar = null;

const dateClick = info => {
    if (info.view.type !== "timeGridWeek") {
        alert("Switch to Week view to add appointments.");
        return;
    }

    // Set the information
    options.title = "Basic Package";
    options.start = new moment(info.date).format("YYYY-MM-DD HH:mm:ss");
    options.end = new moment(info.date)
        .add(1, "hour")
        .format("YYYY-MM-DD HH:mm:ss");

    // Show the modal
    $("#exampleModal").modal("show");
};

const eventClick = info => {
    if (info.view.type !== "timeGridWeek") {
        alert("Switch to Week view to delete appointments.");
        return;
    }

    options.title = info.event.title;
    options.start = new moment(info.date).format("YYYY-MM-DD HH:mm:ss");
    options.end = new moment(info.date)
        .add(1, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    options.id = info.event.id;
    options.color = info.event.backgroundColor;
    options.textColor = info.event.textColor;

    $("#editModal").modal("show");
};

$("#exampleModal").on("show.bs.modal", function(event) {
    var modal = $(this);
    modal.find("#title").val(options.title);
    modal.find("#start").val(options.start);
    modal.find("#end").val(options.end);
});

$("#editModal").on("show.bs.modal", function(event) {
    var modal = $(this);
    modal.find("#title").val(options.title);
    modal.find("#start").val(options.start);
    modal.find("#end").val(options.end);
    modal.find("#id").val(options.id);
    console.log(options);
    modal.find("#color").val(options.color);
    modal.find("#textColor").val(options.textColor);
});

export const renderTimeGridView = () => {
    let calendarEl = document.getElementById("calendar");

    calendar = new Calendar(calendarEl, {
        plugins: [
            dayGridPlugin,
            timeGridPlugin,
            bootstrapPlugin,
            interactionPlugin
        ],
        themeSystem: "bootstrap", //standard/bootstrap
        initialView: "timeGridWeek",
        height: 650,
        firstDay: 1,
        eventDisplay: "auto",
        allDay: false,

        showNonCurrentDates: false,
        // Define Header Buttons
        headerToolbar: {
            start: "prev,today,next",
            center: "title",
            end: "timeGridWeek,dayGridMonth" // timeGridWeek,dayGridMonth
        },

        dayHeaderContent: args => {
            return moment(args.date).format("ddd D.MM.");
        },

        slotLabelFormat: {
            hour: "numeric",
            minute: "2-digit",
            meridiem: false,
            hour12: false
        },

        // User interaction handling
        selectable: false,
        dateClick: info => {
            dateClick(info);
        },
        select: function(info) {
            alert("selected " + info.startStr + " to " + info.endStr);
        },

        eventClick: info => {
            eventClick(info);
        },
        select: function(info) {
            alert("selected " + info.startStr + " to " + info.endStr);
        }

    });

    calendar.render();
};

export const addEvents = (events) => {

    calendar.addEventSource(events);
}
// CODE ///////////////////////////////////////////////////////////////////////
