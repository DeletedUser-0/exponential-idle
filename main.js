var player = {
    money: {
        total: 0,
        onclick: 0.02,
        increase: 0.00003,
        totalincrease: 1.00003
    },
    upg1: {
        cost: 50,
        level: 0
    },
}

var currency = " points";

document.getElementById('currency').addEventListener('keyup', e => {
    currency = e.target.value
})

function click() {
    player.money.totalincrease = Decimal.add(player.money.increase, 1);
    player.money.onclick = Decimal.times(player.money.onclick, player.money.totalincrease);
    player.money.total = Decimal.add(player.money.total, player.money.onclick);
}

function IncreaseMultiplier1() {
    if (Decimal.compare(player.money.total, player.upg1.cost) >= 0) {
        player.money.total = Decimal.sub(player.money.total, player.upg1.cost);
        player.upg1.cost = Decimal.pow(player.upg1.cost, 1.048);
        if (Decimal.compare(player.upg1.level, 25) >= 0) {
                    player.upg1.cost = Decimal.pow(player.upg1.cost, 1.072);
        }
        player.upg1.level = Decimal.add(player.upg1.level, 1);
        player.money.increase = Decimal.times(player.money.increase, 1.08)
    }
}

function UpdateUI() {
    document.getElementById("money").innerHTML = `You have ${notate(player.money.total)}${currency}.`
    document.getElementById("mps").innerHTML = `${notate2(Decimal.times(player.money.onclick, 50))}${currency} per second (+${notate2(Decimal.pow(player.money.totalincrease, 50).sub(1).times(100)}%)`
    document.getElementById("upg1").innerHTML = `Cost: ${notate(player.upg1.cost)} <br> Level: ${notate(player.upg1.level)}`
}

function saveGame() {
	saveData = player;
	localStorage.saveData = JSON.stringify(saveData);
}

function loadGame() {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    save = player;
    return saveData.obj || "default";
}

var mainGameLoop = window.setInterval(function () {
    click()
}, 20);

var mainGameLoop = window.setInterval(function () {
    UpdateUI()
}, 1);

function notate(n) {
    var e = n.exponent;
    var m = n.mantissa
    if (e < 4) return (m * Math.pow(10, e)).toFixed(0);
    return `${m.toPrecision(3)}e${e}`;
}

function notate2(n) {
    var e = n.exponent;
    var m = n.mantissa
    if (e < 3) return (m * Math.pow(10, e)).toPrecision(4);
    return `${m.toFixed(2)}e${e}`;
}
