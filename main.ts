//Výběr módu
mecanumRobot.setServo(90)
basic.showString("mode?")

input.onButtonPressed(Button.A, function () {
    samojezditko()
})
input.onButtonPressed(Button.B, function () {
    nasledovani()
})
input.onButtonPressed(Button.AB, function () {
    linka()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    ovladac()
})
//Funkce směru jízdy
function dopredu() {
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 75)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 75)
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 75)
    mecanumRobot.Motor(LR.Lower_right, MD.Back, 75)
}
function doleva() {
    mecanumRobot.Motor(LR.Upper_left, MD.Back, 75)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 75)
    mecanumRobot.Motor(LR.Lower_left, MD.Back, 75)
    mecanumRobot.Motor(LR.Lower_right, MD.Back, 75)
}
function doprava() {
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 75)
    mecanumRobot.Motor(LR.Upper_right, MD.Back, 75)
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 75)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 75)
}
function dozadu() {
    mecanumRobot.Motor(LR.Upper_left, MD.Back, 75)
    mecanumRobot.Motor(LR.Upper_right, MD.Back, 75)
    mecanumRobot.Motor(LR.Lower_left, MD.Back, 75)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 75)
}
//funkce samotného ježdění
function samojezditko() {
    let vzdalenost = 0
    let vzdalenostl = 0
    let vzdalenostp = 0

    basic.showString("mode1")
    basic.pause(1000)

    basic.forever(function () {
        vzdalenost = mecanumRobot.ultra()
        if (vzdalenost < 30) {
            mecanumRobot.state(MotorState.stop)
            basic.pause(1000)
            mecanumRobot.setServo(0)
            basic.pause(1000)
            vzdalenostp = mecanumRobot.ultra()
            mecanumRobot.setServo(180)
            basic.pause(1000)
            vzdalenostl = mecanumRobot.ultra()
            if (vzdalenostl < vzdalenostp) {
                doprava()
                mecanumRobot.setServo(90)
                basic.pause(400)
            }
            else {
                doleva()
                mecanumRobot.setServo(90)
                basic.pause(400)
            }

        }
        else {
            dopredu()
        }
    })

}
//funkce nasledování objektu
function nasledovani() {
    basic.showString ("mode2")
    basic.pause(1000)

    basic.forever(function() {
        let vzdalenost = 0

        vzdalenost = mecanumRobot.ultra()
        if (vzdalenost < 20) {
            dozadu ()
        }
        if (vzdalenost < 30) {
            mecanumRobot.state(MotorState.stop)
        }
        if (vzdalenost < 50 ) {
            dopredu ()
        }
        else {
            mecanumRobot.state(MotorState.stop)
        }

    })

}
//funkce ježdění podle čáry
function linka() {
    basic.showString ("mode3")
    basic.pause (1000)

    basic.forever(function() {

        if (mecanumRobot.LineTracking(LT.Left) == 0 && mecanumRobot.LineTracking(LT.Right) == 1) {
            doprava ()
        }
        if (mecanumRobot.LineTracking(LT.Left) == 1 && mecanumRobot.LineTracking(LT.Right) == 0) {
            doleva ()
        }
        if (mecanumRobot.LineTracking(LT.Left) == 0 && mecanumRobot.LineTracking(LT.Right) == 0) {
            mecanumRobot.state(MotorState.stop)
        }
        else {
            dopredu()
        }
    }) 
}
//funkce spojení vozidla s mobilovou aplikací a následné řízení 
function ovladac() {

    let connect = 0
    let rec_data = ""
    serial.redirectToUSB()

    basic.showString ("mode4")
    basic.pause (1000)

    bluetooth.onBluetoothConnected(function() {
        basic.showString ("connected")
        connect = 1
        while (connect == 1) {
            rec_data = (bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
            serial.writeString(rec_data)
            serial.writeLine("") 
        }
    })

    bluetooth.onBluetoothDisconnected(function() {
        basic.showString ("disconnected")
    })
}
