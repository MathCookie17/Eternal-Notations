var assert_eq_tolerance = function(error, a, b, precision = 1e-7) // Taken from break_eternity
{
  a = new Decimal(a);
  b = new Decimal(b);
  if (!a.isFinite() && !b.isFinite())
  {
    if (a.isNan() && b.isNan())
    {
      return;
    }
    if (a.sign == b.sign)
    {
      return;
    }
  }
  if (!a.eq_tolerance(b, precision))
  {
    console.log(error);
  }
}

var test_factorial_round_trip = function() {
    console.log("test_factorial_round_trip");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.random()*10 + 1;
        let iterations = Math.random()*10;
        let round_trip = EternalNotations.inverse_factorial(EternalNotations.iteratedfactorial(base, iterations), iterations);
        assert_eq_tolerance(base + ", " + iterations, base, round_trip);
    }
}

var test_factorial_slog = function() {
    console.log("test_factorial_slog");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.random()*10 + 2;
        let iterations = Math.random()*10;
        let round_trip = EternalNotations.factorial_slog(EternalNotations.iteratedfactorial(base, iterations), base);
        assert_eq_tolerance(base + ", " + iterations, iterations, round_trip);
    }
}

var test_scientifify = function() {
    console.log("test_scientifify");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10);
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        if (value.eq(0)) continue;
        let [b, e] = EternalNotations.scientifify(value, base);
        if (b.abs().lt(1) || b.abs().gte(base)) {
            console.log(value + " in base " + base + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = Decimal.pow(base, e).mul(b);
        assert_eq_tolerance(value + " in base " + base + ": " + product, value, product);
    }
}

var test_scientifify_small_base = function() {
    console.log("test_scientifify_small_base");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * -10);
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        if (value.eq(0)) continue;
        let [b, e] = EternalNotations.scientifify(value, base);
        if (b.abs().gt(1) || b.abs().lte(base)) {
            console.log(value + " in base " + base + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = Decimal.pow(base, e).mul(b);
        assert_eq_tolerance(value + " in base " + base + ": " + product, value, product);
    }
}

var test_hyperscientifify = function() {
    console.log("test_hyperscientifify");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10) + 1.5;
        let value = Decimal.randomDecimalForTesting(1e6).abs();
        let [b, e] = EternalNotations.hyperscientifify(value, base);
        if (b.lt(1) || b.gte(base)) {
            console.log(value + " in base " + base + " has b = " + b + " and e = " + e);
            continue;
        }
        let tower = Decimal.iteratedexp(base, e, b, true);
        assert_eq_tolerance(value + " in base " + base + ": " + tower, value, tower);
    }
}

var test_factorial_scientifify = function() {
    console.log("test_factorial_scientifify");
    for (var i = 0; i < 1000; ++i) {
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        if (value.eq(0) || value.abs().eq(1)) continue; //Skipping 1 because factorial scientifify fixes imprecision there but Decimal's factorial does not
        if (value.abs().lt(1)) value = value.recip();
        let [b, e] = EternalNotations.factorial_scientifify(value);
        if (b.abs().lt(1) || b.abs().gte(e.plus(1))) {
            console.log(value + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = Decimal.factorial(e).mul(b);
        assert_eq_tolerance(value + " -> " + product, value, product);
    }
}

var test_factorial_scientifify_small = function() {
    console.log("test_factorial_scientifify_small");
    for (var i = 0; i < 1000; ++i) {
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        if (value.eq(0) || value.abs().eq(1)) continue; //Skipping 1 because factorial scientifify fixes imprecision there but Decimal's factorial does not
        if (value.abs().gt(1)) value = value.recip();
        let [b, e] = EternalNotations.factorial_scientifify(value);
        if (b.abs().lt(1) || b.abs().gte(e.neg().plus(1))) {
            console.log(value + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = b.div(Decimal.factorial(e.neg()));
        assert_eq_tolerance(value + " -> " + product, value, product);
    }
}

var test_factorial_hyperscientifify = function() {
    console.log("test_factorial_hyperscientifify");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10) + 2;
        let value = Decimal.randomDecimalForTesting(1e6).abs().plus(2);
        if (base == 2 || value.eq(2)) continue;
        let [b, e] = EternalNotations.factorial_hyperscientifify(value, base);
        if (b.lt(base) || b.gte(Decimal.factorial(base))) {
            console.log(value + " in base " + base + " has b = " + b + " and e = " + e);
            continue;
        }
        let tower = EternalNotations.iteratedfactorial(b, e);
        assert_eq_tolerance(value + " in base " + base + ": " + tower, value, tower);
    }
}

var test_scientifify_mantissaPower = function() {
    console.log("test_scientifify_mantissaPower");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10);
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        let mantissaPower = Math.floor(Math.random() * 20) - 10;
        if (value.eq(0)) continue;
        let [b, e] = EternalNotations.scientifify(value, base, 0, mantissaPower);
        if (b.abs().lt(Decimal.pow(base, mantissaPower)) || b.abs().gte(Decimal.pow(base, mantissaPower + 1))) {
            console.log(value + " in base " + base + " with mantissaPower " + mantissaPower + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = Decimal.pow(base, e).mul(b);
        assert_eq_tolerance(value + " in base " + base + " with mantissaPower " + mantissaPower + ": " + product, value, product);
    }
}

var test_scientifify_small_base_mantissaPower = function() {
    console.log("test_scientifify_small_base_mantissaPower");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * -10);
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        let mantissaPower = Math.floor(Math.random() * 20) - 10;
        if (value.eq(0)) continue;
        let [b, e] = EternalNotations.scientifify(value, base, 0, mantissaPower);
        if (b.abs().gt(Decimal.pow(base, mantissaPower)) || b.abs().lte(Decimal.pow(base, mantissaPower + 1))) {
            console.log(value + " in base " + base + " with mantissaPower " + mantissaPower + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = Decimal.pow(base, e).mul(b);
        assert_eq_tolerance(value + " in base " + base + " with mantissaPower " + mantissaPower + ": " + product, value, product);
    }
}

var test_hyperscientifify_mantissaPower = function() {
    console.log("test_hyperscientifify_mantissaPower");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10) + 1.5;
        let value = Decimal.randomDecimalForTesting(1e6).abs();
        if (value.eq(0)) continue;
        let mantissaPower = Math.floor(Math.random() * 20) - 1;
        let [b, e] = EternalNotations.hyperscientifify(value, base, 0, mantissaPower);
        if (b.lt(Decimal.tetrate(base, mantissaPower, 1, true)) || b.gte(Decimal.tetrate(base, mantissaPower + 1, 1, true))) {
            console.log(value + " in base " + base + " with mantissaPower " + mantissaPower + " has b = " + b + " and e = " + e);
            continue;
        }
        let tower = Decimal.iteratedexp(base, e, b, true);
        assert_eq_tolerance(value + " in base " + base + " with mantissaPower " + mantissaPower + ": " + tower, value, tower);
    }
}

var test_hypersplit = function() {
    console.log("test_hypersplit");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10) + 1.5;
        let range = Math.floor(Math.random() * 3);
        let value;
        if (range == 0) value = Decimal.randomDecimalForTesting(0);
        else if (range == 1) value = Decimal.randomDecimalForTesting(10);
        else value = Decimal.randomDecimalForTesting(Math.pow(10, Math.random() * 308));
        value = EternalNotations.multabs(value.abs());
        let [m, e, t, p] = EternalNotations.hypersplit(value, base);
        let result = Decimal.pentate(base, p, Decimal.tetrate(base, t, Decimal.pow(base, e).mul(m), true), true);
        assert_eq_tolerance(value + " in base " + base + ": " + result, value.slog(), result.slog());
    }
}

var test_iteratedPolygonRoot = function() {
    console.log("test_iteratedPolygonRoot");
    for (var i = 0; i < 1000; ++i) {
        let payload = EternalNotations.multabs(Decimal.randomDecimalForTesting(5).abs());
        let iterations = Math.random()*10;
        let sides = Math.random() * 100 + 2;
        let round_trip = EternalNotations.iteratedPolygonRoot(EternalNotations.biPolygon(iterations, sides, payload), iterations, sides);
        assert_eq_tolerance(payload + ", " + iterations + ", " + sides + " -> " + round_trip, payload, round_trip);
    }
}

var test_biPolygonRoot = function() {
    console.log("test_biPolygonRoot");
    for (var i = 0; i < 1000; ++i) {
        let iterations = Math.random()*100;
        let sides = Math.random() * 100 + 2;
        let round_trip = EternalNotations.biPolygonRoot(EternalNotations.biPolygon(iterations, sides), sides);
        assert_eq_tolerance(iterations  + ", " + sides  + " -> " + round_trip, iterations, round_trip);
    }
}

var test_iteratedBiPolygonRoot = function() {
    console.log("test_iteratedBiPolygonRoot");
    for (var i = 0; i < 1000; ++i) {
        let payload = EternalNotations.multabs(Decimal.randomDecimalForTesting(5).abs());
        if (payload.eq(0)) continue;
        let iterations = Math.random()*10;
        let sides = Math.random() * 100 + 2;
        let round_trip = EternalNotations.iteratedBiPolygonRoot(EternalNotations.triPolygon(iterations, sides, 2, payload), iterations, sides);
        assert_eq_tolerance(payload + ", " + iterations + ", " + sides + " -> " + round_trip, payload, round_trip);
    }
}

var test_triPolygonRoot = function() {
    console.log("test_triPolygonRoot");
    for (var i = 0; i < 1000; ++i) {
        let iterations = Math.random()*100;
        let sides = Math.random() * 100 + 2.3; // If sides gets too close to 2, we hit fixed points which I'm not sure how to deal with yet.
        let round_trip = EternalNotations.triPolygonRoot(EternalNotations.triPolygon(iterations, sides), sides);
        assert_eq_tolerance(iterations  + ", " + sides + " -> " + round_trip, iterations, round_trip);
    }
}

var test_weak_slog = function() {
    console.log("test_weak_slog");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.random()*10 + 2;
        let iterations = Math.random()*10;
        let round_trip = EternalNotations.weak_slog(EternalNotations.weak_tetrate(base, iterations), base);
        assert_eq_tolerance(base + ", " + iterations, iterations, round_trip);
    }
}

var test_weak_hyperscienfifify = function() {
    console.log("test_weak_hyperscientifify");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10);
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        value = EternalNotations.multabs(value.abs());
        if (value.eq(0) || value.eq(1)) continue;
        let [b, e] = EternalNotations.weak_hyperscientifify(value, base);
        if (b.abs().lt(1) || b.abs().gte(base)) {
            console.log(value + " in base " + base + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = EternalNotations.weak_tetrate(base, e).pow(b);
        assert_eq_tolerance(value + " in base " + base + ": " + product, value, product);
    }
}

var test_weak_hyperscientifify_mantissaPower = function() {
    console.log("test_weak_hyperscientifify_mantissaPower");
    for (var i = 0; i < 1000; ++i) {
        let power = Math.random() * 10;
        let base = Math.pow(10, power);
        let value = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
        let mpLimit = 9 / power; // If the mantissa power is too high weak tetration converges to 1
        let mantissaPower = Math.floor(Math.random() * mpLimit * 2) - mpLimit;
        value = EternalNotations.multabs(value.abs());
        if (value.eq(0) || value.eq(1)) continue;
        let [b, e] = EternalNotations.weak_hyperscientifify(value, base, 0, mantissaPower);
        if (b.abs().lt(Decimal.pow(base, mantissaPower)) || b.abs().gte(Decimal.pow(base, mantissaPower + 1))) {
            console.log(value + " in base " + base + " with mantissaPower " + mantissaPower + " has b = " + b + " and e = " + e);
            continue;
        }
        let product = EternalNotations.weak_tetrate(base, e).pow(b);
        assert_eq_tolerance(value + " in base " + base + " with mantissaPower " + mantissaPower + ": " + b + ", " + e + " -> " + product, value, product);
    }
}

var test_pentascientifify = function() {
    console.log("test_pentascientifify");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10) + 1.5;
        let value = EternalNotations.multabs(Decimal.randomDecimalForTesting(1e6).abs());
        if (value.eq(0) || value.eq(1)) continue;
        let [b, e] = EternalNotations.pentascientifify(value, base);
        if (b.lt(1) || b.gte(base)) {
            console.log(value + " in base " + base + " has b = " + b + " and e = " + e);
            continue;
        }
        let tower = Decimal.pentate(base, e, b, true);
        assert_eq_tolerance(value + " in base " + base + ": " + tower, value.slog(), tower.slog());
    }
}

var test_pentascientifify_mantissaPower = function() {
    console.log("test_pentascientifify_mantissaPower");
    for (var i = 0; i < 1000; ++i) {
        let base = Math.pow(10, Math.random() * 10) + 1.5;
        let value = EternalNotations.multabs(Decimal.randomDecimalForTesting(1e6).abs());
        if (value.eq(0) || value.eq(1)) continue;
        let mantissaPower = Math.floor(Math.random() * 3);
        if (!Decimal.pentate(base, mantissaPower + 1, 1, true).isFinite()) mantissaPower = Math.floor(Math.random() * 2);
        if (!Decimal.pentate(base, mantissaPower + 1, 1, true).isFinite()) mantissaPower = Math.floor(Math.random() * 1);
        let [b, e] = EternalNotations.pentascientifify(value, base, 0, mantissaPower);
        if (b.lt(Decimal.pentate(base, mantissaPower, 1, true)) || b.gte(Decimal.pentate(base, mantissaPower + 1, 1, true))) {
            console.log(value + " in base " + base + " with mantissaPower " + mantissaPower + " has b = " + b + " and e = " + e);
            continue;
        }
        let tower = Decimal.pentate(base, e, b, true);
        assert_eq_tolerance(value + " in base " + base + " with mantissaPower " + mantissaPower + ": " + tower, value.slog(), tower.slog());
    }
}

var test_FGH2inverse = function() {
    console.log("test_FGH2inverse");
    for (var i = 0; i < 1000; ++i) {
        let value = EternalNotations.multabs(Decimal.randomDecimalForTesting(5).abs());
        let round_trip = EternalNotations.FGH2inverse(EternalNotations.FGH2(value));
        assert_eq_tolerance(value + " -> " + round_trip, value, round_trip);
    }
}

var test_iteratedFGH2log = function() {
    console.log("test_iteratedFGH2log");
    for (var i = 0; i < 1000; ++i) {
        let payload = EternalNotations.multabs(Decimal.randomDecimalForTesting(5).abs());
        if (payload.eq(0)) continue;
        let iterations = Math.random()*100;
        let round_trip = EternalNotations.iteratedFGH2log(EternalNotations.iteratedFGH2(payload, iterations), payload);
        assert_eq_tolerance(payload + ", " + iterations + " -> " + round_trip, iterations, round_trip);
    }
}

var test_FGH3inverse = function() {
    console.log("test_FGH3inverse");
    for (var i = 0; i < 1000; ++i) {
        let value = Math.pow(10, Math.random() * 100);
        let round_trip = EternalNotations.FGH3inverse(EternalNotations.FGH3(value));
        assert_eq_tolerance(value + " -> " + round_trip, value, round_trip);
    }
}

var test_iteratedFGH3log = function() {
    console.log("test_iteratedFGH3log");
    for (var i = 0; i < 1000; ++i) {
        let payload = EternalNotations.multabs(Decimal.randomDecimalForTesting(5).abs());
        if (payload.eq(0)) continue
        let iterations = Math.random()*10;;
        let round_trip = EternalNotations.iteratedFGH3log(EternalNotations.iteratedFGH3(payload, iterations), payload);
        if (!round_trip.isFinite()) continue;
        assert_eq_tolerance(payload + ", " + iterations + " -> " + round_trip, iterations, round_trip);
    }
}

var test_FGH4inverse = function() {
    console.log("test_FGH4inverse");
    for (var i = 0; i < 1000; ++i) {
        let value = Math.random()*1.1 + 1;
        console.log(value);
        let round_trip = EternalNotations.FGH4inverse(EternalNotations.FGH4(value));
        assert_eq_tolerance(value + " -> " + round_trip, value, round_trip);
    }
}

var all_tests = function() {
    test_factorial_round_trip();
    test_factorial_slog();
    test_scientifify();
    test_scientifify_small_base();
    test_hyperscientifify();
    test_factorial_scientifify();
    test_factorial_scientifify_small();
    test_factorial_hyperscientifify();
    test_scientifify_mantissaPower();
    test_scientifify_small_base_mantissaPower();
    test_hyperscientifify_mantissaPower();
    test_iteratedPolygonRoot();
    test_biPolygonRoot();
    test_iteratedBiPolygonRoot();
    test_triPolygonRoot();
    test_weak_slog();
    test_weak_hyperscienfifify();
    test_pentascientifify();
    test_pentascientifify_mantissaPower();
    test_FGH2inverse();
    test_iteratedFGH2log();
    test_FGH3inverse();
    test_iteratedFGH3log();
    test_FGH4inverse();
}