import Decimal from "break_eternity.js";
import { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { scientifify, toDecimal } from "../baseline/utils.js";
import { AppliedFunctionNotation } from "../baseline/appliedFunction.js";

    /**
     * Uses the names of large numbers to abbreviate them: a million is 1 M, two billion is 2 B, and so on. Larger names use the -illion scheme devised by Jonathan Bowers.
     * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
     * @param longScale ( boolean ) The short scale is used if this is false, the long scale is used if this is true. Default is false.
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
     * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     */
export class StandardNotation extends Notation {
    private _dialect : number = 0;
    public longScale : boolean = false;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _entriesLimit : number = 5;
    private _charLimit : number = 50;
    public innerNotation : Notation = new DefaultNotation();

    private prefixes : any // This object can have different parameters, so I'm making this any type
    private charLimitReached : boolean = false;

    constructor(
        dialect : number = 0,
        longScale : boolean = false,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        entriesLimit : number = 5,
        charLimit : number = 50,
        innerNotation : Notation = new DefaultNotation(),
        ) {
      super();
      this.dialect = dialect;
      this.longScale = longScale;
      this.rounding = rounding;
      this.entriesLimit = entriesLimit;
      this.charLimit = charLimit;
      this.innerNotation = innerNotation;
      if (this._dialect == 1) {
        // Antimatter Dimensions Standard
        this.prefixes = {
            early1: ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"], 
            layer1: [["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], 
                     ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], 
                     ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]], 
            early2: ["", "MI", "MC", "NA", "PC", "FM", "AT", "ZP"]
        };
      }
      else if (dialect == 2) this.prefixes = {
        // Aarex's Abbreviation System
        early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
        layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
                 ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], 
                 ["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]], 
        early2: ["", "Mi", "Mc", "Na", "Pc", "Fem", "At", "Zep", "Yo", "Xn", "Vc", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En"], 
        layer2: [["", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En", "Ve", "Mec", "Duc", "Trc", "Tec", "Pc", "Hxc", "Hpc", "Otc", "Ec"],
                 ["", "Vc", "Is", "TrC", "TeC", "PeC", "HeC", "HpC", "OtC", "EnC"],
                 ["", "Hec", "DHc", "TrH", "TeH", "PeH", "HeH", "HpH", "OtH", "EnH"]],
        early3: ["", "Kl", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe", "Dk", "Hn", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
        layer3: [["", "eN", "oD", "tR", "tE", "pT", "eX", "zE", "yO", "xN",
                  "DaK", "En", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD",
                  "Ik", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN",
                  "Trk", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN",
                  "Tek", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN",
                  "Pek", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN",
                  "Exk", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN",
                  "Zak", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN",
                  "Yok", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN",
                  "Nek", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"],
                  ["T", "EN", "OD", "TR", "TE", "PT", "EC", "ZT", "YT", "XE",
                  "DaK", "En", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD",
                  "IK", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN",
                  "TrK", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN",
                  "TeK", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN",
                  "PeK", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN",
                  "ExK", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN",
                  "ZaK", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN",
                  "YoK", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN",
                  "NeK", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"],
                  ["", "Ho", "Do", "To", "Tr", "Po", "Ex", "Zo", "Yo", "No"]], // layer3[0] is the layer3 entries below 100, layer3[1] is the layer3 entries below 100 when they come after a multiple of 100, and layer3[2] is the multiples of 100
        prefixearly3: ["", "", "D", "T", "Tr", "P", "Ex", "Z", "Y", "N", "DK", "HN", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
        early4: ["", "KaL", "MeJ", "GiJ", "AsT", "LuN", "FrM", "JoV", "SoL", "BeT", "GaX", "GlO", "SuP", "VrS", "MlT"]
      };
      else this.prefixes = {
        // MathCookie's Standard
        early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"], // Below a decillion
        layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"], 
                 ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], 
                 ["", "Cn", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]], // Ones, tens, and hundreds prefixes on layer 1
        early2: ["", "Ml", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"], // First 19 on layer 2
        layer2: [["", "Me", "Du", "To", "Tt", "Pn", "Hx", "Hp", "Ot", "En", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"], 
                 ["", "Vc", "Ic", "Ta", "Te", "Pe", "He", "Ht", "Oa", "Ea"],
                 ["", "Hc", "Dh", "Th", "Tth", "Ph", "Hxh", "Hph", "Oh", "Eh"]], // Ones, tens, and hundreds on layer 2. 11 through 19 use their ones entry, but higher numbers go back to ones + tens
        early3: ["", "Ki", "Mg", "Gg", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"], // First 19 on layer 3
        layer3: [["", "Hd", "Di", "Ti", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"],
                 ["", "Da", "Ik", "Tak", "Tek", "Pk", "Ek", "Zk", "Yk", "Nk"],
                 ["", "Ho", "Bo", "Tro", "Tot", "Po", "Eo", "Zo", "Yo", "Nt"]], // Ones, tens, and hundreds on layer 3. Behaves the same as layer 2
        prefixearly3: ["", "", "Dl", "Ta", "Tl", "Pl", "El", "Zl", "Yl", "Nl", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"], // When layer 3 entries below 20 are used as a prefix on a layer 4 entry rather than standing on their own, these are used. The usual layer3 entries are used above 20.
        early4: ["", "Ka", "Mj", "Gj", "As", "Lu", "Fr", "Jv", "Sl", "Bt", "Gx", "Go", "Sp", "Vs", "Mu"] // Layer 4; the illions run out after Mu
      };
    }

    public name = "Standard Notation";
  
    public formatDecimal(value: Decimal): string {
      this.charLimitReached = false;
      if (value.eq(0)) return this.innerNotation.format(0);
      let result = "";
      let negExp = false;
      let base = new Decimal(1000);
      if (this.longScale) base = new Decimal(1e6);
      if (value.lt(1) && this._dialect == 2) {
        if (value.gte(0.01)) return this.innerNotation.format(value);
        let recipNotation = new AppliedFunctionNotation(
            function(value : Decimal) : Decimal {return value.recip();},
            this, function(value : string) {return "1 / " + value;}
        )
        return recipNotation.format(value);
      }
      if (value.lt(1)) {
        negExp = true;
        let [m, e] = scientifify(value, base);
        value = base.pow(e.neg()).mul(m); 
      }
      if (this._dialect == 2 && value.gte(Decimal.tetrate(10, base.toNumber()))) {
        if (negExp) result += "/";
        result += "MXS^";
        result += this.format(value.slog(10));
        return result;
      }
      else if (this._dialect != 2 && value.gte(base.pentate(2))) {
        if (negExp) result += "/";
        result += "Il^";
        result += this.format(value.slog(base));
        return result;
      }
      else {
        let limit = new Decimal("eee3e45");
        if (this._dialect == 1) {
            if (this.longScale) limit = new Decimal("e6e24");
            else limit = new Decimal("e3e24");
        }
        let aboveLimit = false;
        if (value.gte(limit)) {
            aboveLimit = true;
            let limBase = base;
            if (this._dialect == 2) limBase = Decimal.dTen;
            let fronts = value.slog(limBase).sub(limit.slog(limBase)).plus(1).floor();
            value = value.iteratedlog(limBase, fronts.toNumber(), true);
            if (this._dialect == 2) {
                if (negExp) result += "/";
                if (fronts.eq(1)) result += "MXS-(";
                else result += "MXS^" + this.format(fronts) + "-(";
                negExp = false;
            }
            else {
                if (negExp) result += "/";
                if (fronts.eq(1)) result += "Il(";
                else result += "Il^" + this.format(fronts) + "(";
                negExp = false;
            }
        }
        let [mantissa, illion] = scientifify(value, base, this.rounding);
        if (value.lte(base.pow(Decimal.pow(1000, this._entriesLimit)))) result += this.innerNotation.format(mantissa);
        if (illion.eq(0)) return result; //No -illion here
        if (value.lte(base.pow(Decimal.pow(1000, this._entriesLimit)))) result += " ";
        if (negExp) result += "/";
        if (!this.longScale) illion = illion.sub(1); //Since 1,000 is the "0th" illion and 1,000,000 is the first; this isn't an issue in long scale
        let charsSoFar = 0; //This is used to keep track of whether we've hit the character limit
        if (illion.lt(10)) result += this.prefixes.early1[illion.toNumber()];
        else {
            let iterations = 0;
            while (iterations < this._entriesLimit && illion.gt(0)) {
                //Layer 1 loop
                iterations++;
                let superillion = illion.log(1000).floor();
                let coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                //These next few if statements address imprecision errors
                let imprecisions = 0;
                if (coefficient.eq(0)) {
                    superillion = superillion.sub(1);
                    coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                    imprecisions++;
                }
                if (coefficient.gte(1000)) {
                    superillion = superillion.plus(1);
                    coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                    imprecisions++;
                }
                if (coefficient.eq(0) && imprecisions == 2) {
                    //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
                    coefficient = Decimal.dOne;
                    illion = Decimal.dZero;
                }
                else illion = illion.sub(coefficient.mul(Decimal.pow(1000, superillion)));
                let coefficientPart = this.prefixes.layer1[0][coefficient.mod(10).toNumber()] + this.prefixes.layer1[1][coefficient.div(10).floor().mod(10).toNumber()] + this.prefixes.layer1[2][coefficient.div(100).floor().mod(10).toNumber()];
                if (coefficient.gt(1) || superillion.eq(0)) {
                    result += coefficientPart;
                    charsSoFar += coefficientPart.length;
                }
                let superPart = "";
                superPart += this.calcLayer2(superillion, charsSoFar);
                charsSoFar += superPart.length;
                result += superPart;
                if (this.charLimitReached) break;
                if (illion.gt(0)) {
                    result += "-";
                    charsSoFar += 1;
                }
                if (charsSoFar > this._charLimit && illion.gt(0)) this.charLimitReached = true;
                if (this.charLimitReached) break;
            }
            if (iterations == this._entriesLimit && illion.gt(0)) this.charLimitReached = true;
        }
        if (this.charLimitReached) result += "...";
        if (aboveLimit) result += ")";
      }
      return result;
    }

    private calcLayer2(illion : Decimal, charsComingIn : number = 0): string {
        let result = "";
        let charsSoFar = 0;
        let iterations = 0;
        while (iterations < this._entriesLimit && illion.gt(0)) {
            //Layer 2 loop
            iterations++;
            illion = illion.floor(); //Combats imprecision
            let superillion = illion.log(1000).floor();
            let coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
            let imprecisions = 0;
            if (coefficient.eq(0)) {
                superillion = superillion.sub(1);
                coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                imprecisions++;
            }
            if (coefficient.gte(1000)) {
                superillion = superillion.plus(1);
                coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                imprecisions++;
            }
            if (coefficient.eq(0) && imprecisions == 2) {
                //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
                coefficient = Decimal.dOne;
                illion = Decimal.dZero;
            }
            else illion = illion.sub(coefficient.mul(Decimal.pow(1000, superillion)));
            let coefficientPart = "";
            if (coefficient.mod(100).lt(20)) {
                if (superillion.eq(0) && coefficient.lt(100)) coefficientPart = this.prefixes.early2[coefficient.mod(100).toNumber()];
                else coefficientPart = this.prefixes.layer2[0][coefficient.mod(100).toNumber()];
            }
            else coefficientPart = this.prefixes.layer2[0][coefficient.mod(10).toNumber()] + this.prefixes.layer2[1][coefficient.div(10).floor().mod(10).toNumber()];
            if (coefficient.gte(100)) coefficientPart += this.prefixes.layer2[2][coefficient.div(100).floor().mod(10).toNumber()];
            if (coefficient.gt(1) || superillion.eq(0)) {
                result += coefficientPart;
                charsSoFar += coefficientPart.length;
            }
            let superPart = this.calcLayer3(superillion, charsComingIn + charsSoFar);
            charsSoFar += superPart.length;
            result += superPart;
            if (this.charLimitReached) break;
            if (illion.gt(0)) {
                if (this._dialect == 2) {
                    result += "a'";
                    charsSoFar += 2;
                }
                else {
                    result += "_";
                    charsSoFar += 1;
                }
            }
            if (charsComingIn + charsSoFar > this._charLimit && illion.gt(0)) this.charLimitReached = true;
            if (this.charLimitReached) break;
        }
        if (iterations == this._entriesLimit && illion.gt(0)) this.charLimitReached = true;
        return result;
    }

    private calcLayer3(illion : Decimal, charsComingIn : number = 0): string {
        let result = "";
        let charsSoFar = 0;
        let iterations = 0;
        while (iterations < this._entriesLimit && illion.gt(0)) {
            //Layer 3 loop
            iterations++;
            illion = illion.floor(); //Combats imprecision
            let superillion = illion.log(1000).floor();
            let coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
            let imprecisions = 0;
            if (coefficient.eq(0)) {
                superillion = superillion.sub(1);
                coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                imprecisions++;
            }
            if (coefficient.gte(1000)) {
                superillion = superillion.plus(1);
                coefficient = illion.div(Decimal.pow(1000, superillion)).floor();
                imprecisions++;
            }
            if (coefficient.eq(0) && imprecisions == 2) {
                //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
                coefficient = Decimal.dOne;
                illion = Decimal.dZero;
            }
            else illion = illion.sub(coefficient.mul(Decimal.pow(1000, superillion)));
            let coefficientPart = "";
            if (coefficient.lt(20) || (coefficient.mod(100).lt(20) && this._dialect != 2)) {
                if (superillion.eq(0) && coefficient.lt(100)) coefficientPart += this.prefixes.early3[coefficient.mod(100).toNumber()];
                else if (superillion.eq(0)) coefficientPart += this.prefixes.layer3[0][coefficient.mod(100).toNumber()];
                else coefficientPart += this.prefixes.prefixearly3[coefficient.mod(100).toNumber()];
                if (coefficient.gte(100)) coefficientPart += this.prefixes.layer3[2][coefficient.div(100).floor().mod(10).toNumber()];
            }
            else {
                if (this._dialect == 2) {
                    coefficientPart += this.prefixes.layer3[2][coefficient.div(100).floor().mod(10).toNumber()];
                    if (coefficient.lt(100)) coefficientPart += this.prefixes.layer3[0][coefficient.mod(100).toNumber()];
                    else coefficientPart += this.prefixes.layer3[1][coefficient.mod(100).toNumber()];
                }
                else {
                    coefficientPart = this.prefixes.layer3[0][coefficient.mod(10).toNumber()] + this.prefixes.layer3[1][coefficient.div(10).floor().mod(10).toNumber()];
                    if (coefficient.gte(100)) coefficientPart += this.prefixes.layer3[2][coefficient.div(100).floor().mod(10).toNumber()];
                }
            }
            let superPart = "";
            superPart = this.prefixes.early4[superillion.toNumber()]; //No need for a calcLayer4 because the illions don't go that far
            if (this._dialect == 2 && superillion.gt(0)) {
                //Aarex's Abbreviation System has some character manipulation at Tier 4
                if (coefficient.gt(1)) {
                    superPart = superPart.substring(1);
                    if (superillion.eq(9)) superPart = "eeT";
                    superPart = coefficientPart + superPart;
                }
                if (illion.lt(4)) {
                    superPart += this.prefixes.layer3[0][illion.toNumber()];
                    result += superPart;
                    charsSoFar += superPart.length;
                    illion = Decimal.dZero;
                }
                else {
                    if (superillion.eq(3)) superPart += "`";
                    else superPart = superPart.substring(0, superPart.length - 1);
                    result += superPart;
                    charsSoFar += superPart.length;
                }
            }
            else {
                result += coefficientPart;
                charsSoFar += coefficientPart.length;
                charsSoFar += superPart.length;
                result += superPart;
            }
            if (this.charLimitReached) break;
            if (illion.gt(0) && this._dialect != 2) {
                result += "~";
                charsSoFar += 1;
            }
            if (charsComingIn + charsSoFar > this._charLimit && illion.gt(0)) this.charLimitReached = true;
            if (this.charLimitReached) break;
        }
        if (iterations == this._entriesLimit && illion.gt(0)) this.charLimitReached = true;
        return result;
    }

    public get dialect() {
        return this._dialect;
    }

    public set dialect(dialect : number) {
        this._dialect = dialect;
        if (this._dialect == 1) {
            // Antimatter Dimensions Standard
            this.prefixes = {
                early1: ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"], 
                layer1: [["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], 
                         ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], 
                         ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]], 
                early2: ["", "MI", "MC", "NA", "PC", "FM", "AT", "ZP"]
            };
          }
          else if (dialect == 2) this.prefixes = {
            // Aarex's Abbreviation System
            early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
            layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
                     ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], 
                     ["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]], 
            early2: ["", "Mi", "Mc", "Na", "Pc", "Fem", "At", "Zep", "Yo", "Xn", "Vc", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En"], 
            layer2: [["", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En", "Ve", "Mec", "Duc", "Trc", "Tec", "Pc", "Hxc", "Hpc", "Otc", "Ec"],
                     ["", "Vc", "Is", "TrC", "TeC", "PeC", "HeC", "HpC", "OtC", "EnC"],
                     ["", "Hec", "DHc", "TrH", "TeH", "PeH", "HeH", "HpH", "OtH", "EnH"]],
            early3: ["", "Kl", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe", "Dk", "Hn", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
            layer3: [["", "eN", "oD", "tR", "tE", "pT", "eX", "zE", "yO", "xN",
                      "DaK", "En", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD",
                      "Ik", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN",
                      "Trk", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN",
                      "Tek", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN",
                      "Pek", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN",
                      "Exk", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN",
                      "Zak", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN",
                      "Yok", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN",
                      "Nek", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"],
                      ["T", "EN", "OD", "TR", "TE", "PT", "EC", "ZT", "YT", "XE",
                      "DaK", "En", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD",
                      "IK", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN",
                      "TrK", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN",
                      "TeK", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN",
                      "PeK", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN",
                      "ExK", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN",
                      "ZaK", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN",
                      "YoK", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN",
                      "NeK", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"],
                      ["", "Ho", "Do", "To", "Tr", "Po", "Ex", "Zo", "Yo", "No"]], // layer3[0] is the layer3 entries below 100, layer3[1] is the layer3 entries below 100 when they come after a multiple of 100, and layer3[2] is the multiples of 100
            prefixearly3: ["", "", "D", "T", "Tr", "P", "Ex", "Z", "Y", "N", "DK", "HN", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
            early4: ["", "KaL", "MeJ", "GiJ", "AsT", "LuN", "FrM", "JoV", "SoL", "BeT", "GaX", "GlO", "SuP", "VrS", "MlT"]
          };
          else this.prefixes = {
            // MathCookie's Standard
            early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"], // Below a decillion
            layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"], 
                     ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], 
                     ["", "Cn", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]], // Ones, tens, and hundreds prefixes on layer 1
            early2: ["", "Ml", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"], // First 19 on layer 2
            layer2: [["", "Me", "Du", "To", "Tt", "Pn", "Hx", "Hp", "Ot", "En", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"], 
                     ["", "Qc", "Ic", "Ta", "Te", "Pe", "He", "Ht", "Oa", "Ea"],
                     ["", "Hc", "Dh", "Th", "Tth", "Ph", "Hxh", "Hph", "Oh", "Eh"]], // Ones, tens, and hundreds on layer 2. 11 through 19 use their ones entry, but higher numbers go back to ones + tens
            early3: ["", "Ki", "Mg", "Gg", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"], // First 19 on layer 3
            layer3: [["", "Hd", "Di", "Ti", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"],
                     ["", "Da", "Ik", "Tak", "Tek", "Pk", "Ek", "Zk", "Yk", "Nk"],
                     ["", "Ho", "Bo", "Tro", "Tot", "Po", "Eo", "Zo", "Yo", "Nt"]], // Ones, tens, and hundreds on layer 3. Behaves the same as layer 2
            prefixearly3: ["", "", "Dl", "Ta", "Tl", "Pl", "El", "Zl", "Yl", "Nl", "Qt", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"], // When layer 3 entries below 20 are used as a prefix on a layer 4 entry rather than standing on their own, these are used. The usual layer3 entries are used above 20.
            early4: ["", "Ka", "Mj", "Gj", "As", "Lu", "Fr", "Jv", "Sl", "Bt", "Gx", "Go", "Sp", "Vs", "Mu"] // Layer 4; the illions run out after Mu
          };
    }

    public get entriesLimit() {
        return this._entriesLimit;
    }

    public set entriesLimit(entriesLimit : number) {
        if (entriesLimit <= 0) throw new RangeError("Non-positive entriesLimit in Standard Notation");
        this._entriesLimit = entriesLimit;
    }
    public get charLimit() {
        return this._charLimit;
    }

    public set charLimit(charLimit : number) {
        if (charLimit <= 0) throw new RangeError("Non-positive charLimit in Standard Notation");
        this._charLimit = charLimit;
    }
  }