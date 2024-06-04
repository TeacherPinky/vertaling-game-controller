/**
 * Blocks for driving the Kitronik :GAME Controller
 */
//% weight=100 color=#00A654 icon="\uf11b" block=":GAME Controller"
//% groups='["Invoer", "Feedback"]'
namespace Kitronik_Game_Controller {
    /**
    *:GAME Controller Standard Buttons
    */
    export enum ControllerButtons {
        Up,
        Down,
        Left,
        Right,
        Fire1,
        Fire2
    }

    /**
    *:GAME Controller Button Pins
    */
    export enum ControllerButtonPins {
        //% block="zwarte knop boven (P8)"
        Up = DAL.MICROBIT_ID_IO_P8,
        //% block="zwarte knop onder (P14)"
        Down = DAL.MICROBIT_ID_IO_P14,
        //% block="zwarte knop links (P12)"
        Left = DAL.MICROBIT_ID_IO_P12,
        //% block="zwarte knop rechts (P13)"
        Right = DAL.MICROBIT_ID_IO_P13,
        //% block="groene knop boven (P15)"
        Fire1 = DAL.MICROBIT_ID_IO_P15,
        //% block="groene knop onder (P16)"
        Fire2 = DAL.MICROBIT_ID_IO_P16
    }

    /**
    *:GAME Controller Button Events
    */
    export enum ControllerButtonEvents {
        //% block="ingedrukt"
        Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
        //% block="losgelaten"
        Up = DAL.MICROBIT_BUTTON_EVT_UP,
        //% block="kort ingedrukt"
        Click = DAL.MICROBIT_BUTTON_EVT_CLICK
    }

    /**
     *
     */
    //% shim=Kitronik_Game_Controller::init
    function init(): void {
        return;
    }

    /**
     * Run vibration motor for a particular length of time
     * @param run_time is the length of time the motor will run in ms, eg: 100
     */
    //% group=Feedback
    //% blockId="kitronik_controller_run_motor" block="Zet motor %run_time|ms aan" icon="\uf080"
    //% weight=92 blockGap=8
    export function runMotor(run_time: number): void {
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(run_time)
        pins.digitalWritePin(DigitalPin.P1, 0)
    }

    /**
     * Setup micro:bit to play music through :GAME Controller buzzer
     */
    //% group=Feedback
    //% blockId="kitronik_controller_buzzer_setup" block="gebruik buzzer voor geluiden" icon="\uf080"
    //% weight=91 blockGap=8
    export function setBuzzerPin(): void {
        pins.analogSetPitchPin(AnalogPin.P2)
    }

    /**
     * Determines if a :GAME Controller button is pressed
     * @param button press to be checked
     */
    //% group=Invoer
    //% blockId="kitronik_controller_ispressed" block="%button|is ingedrukt"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    //% weight=95 blockGap=8
    export function buttonIsPressed(button: ControllerButtonPins): boolean {
        const pin = <DigitalPin><number>button;
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == 0;
    }

    /**
     * Do something when one of the :GAME Controller Buttons is pressed
     * @param button press to be checked
     * @param event happening on the button, eg: click
     */
    //% group=Invoer
    //% blockId="kitronik_controller_button_press_on_event" block="als %button|is %event"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=3
    //% weight=93 blockGap=8
    export function onButtonPress(button: ControllerButtonPins, event: ControllerButtonEvents, handler: Action) {
        init();
        control.onEvent(<number>button, <number>event, handler);
    }
}
