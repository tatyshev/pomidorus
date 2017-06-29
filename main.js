class Session {
  constructor () {
    this.left   = this.time;
    this.pauses = [];
  }

  get isFinished () {
    return this.left === 0;
  }

  get time () {
    return 5;
  }

  tick () {
    var next = this.left - 1;

    if (next > 0) {
      this.left = next;
    } else {
      this.left = 0;
    }
  }
}

class Break extends Session {
  get time () {
    return 2;
  }
}

class Sessions {
  constructor () {
    this._started = false;
    this._stopped = false;
    this._items = [];
    this._timer = null;
    this._tick = this._tick.bind(this);

    this._tickHandlers = [];
    this._stopHandlers = [];
  }

  start () {
    if (this._started) {
      console.log('Session already started.');
      return;
    }

    this._started = true;
    this._items.push(this._nextSession());
    this._timer = setInterval(this._tick, 1000);
  }

  continue () {
    this._items.push(this._nextSession());
    this._stopped = false;
  }

  onTick (fn) {
    this._tickHandlers.push(fn);
  }

  onStop (fn) {
    this._stopHandlers.push(fn);
  }

  get latest () {
    let index = this._items.length - 1;

    if (index >= 0) {
      return this._items[index];
    }
  }

  _nextSession () {
    var latest = this.latest;

    if (latest === undefined || latest instanceof Break) {
      return new Session();
    }

    return new Break();
  }

  _tick () {
    if (this._stopped) { return }

    var latest = this.latest;

    this._triggerTick();
    latest.tick();

    if (latest.isFinished) {
      this._stopped = true;
      this._triggerStop();
    }
  }

  _triggerTick () {
    this._tickHandlers.forEach((h) => h.apply(this));
  }

  _triggerStop () {
    this._stopHandlers.forEach((h) => h.apply(this));
  }
}

var sessions = new Sessions();

sessions.onTick(function () {
  var x = this.latest;
  console.log(x);
});

sessions.onStop(function () {
  console.log('---------------------------------');
  console.log('STOP');
  console.log('---------------------------------');

  this.continue();
})

sessions.start();

