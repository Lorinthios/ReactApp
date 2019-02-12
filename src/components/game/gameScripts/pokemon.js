export class Pokemon {

    constructor(id, types, level, nature, stats) {
        this.id = id;
        this.types = types || [Type.normal];
        this.level = level;
        this.nature = nature;
        this.stats = stats;
    }

    getStats() {
        return this.stats.getResult(this.nature);
    }

}

export const Attribute = {
    Attack: 0,
    Defense: 1,
    SpAttack: 2,
    SpDefense: 3,
    Speed: 4
}

export const Flavor = {
    Spicy: 0,
    Sour: 1,
    Dry: 2,
    Bitter: 3,
    Sweet: 4
}

export const Type = {
    normal: 0,
    fight: 1,
    flying: 2,
    poison: 3,
    ground: 4,
    rock: 5,
    bug: 6,
    ghost: 7,
    steel: 8,
    fire: 9,
    water: 10,
    grass: 11,
    electric: 12,
    psychic: 13,
    ice: 14,
    dragon: 15,
    dark: 16,
    fairy: 17
}

export const NatureNameMatrix = {
    "0": {
        "0": "Hardy",
        "1": "Lonely",
        "2": "Adamant",
        "3": "Naughty",
        "4": "Brave"
    },
    "1": {
        "0": "Bold",
        "1": "Docile",
        "2": "Impish",
        "3": "Lax",
        "4": "Relaxed"
    },
    "2": {
        "0": "Modest",
        "1": "Mild",
        "2": "Bashful",
        "3": "Rash",
        "4": "Quiet"
    },
    "3": {
        "0": "Calm",
        "1": "Gentle",
        "2": "Careful",
        "3": "Quirky",
        "4": "Sassy"
    },
    "4": {
        "0": "Timid",
        "1": "Hasty",
        "2": "Jolly",
        "3": "Naive",
        "4": "Serious"
    },
}

export function getRandomNatureInfo() {
    var a = Math.floor(Math.random * 5);
    var b = Math.floor(Math.random * 5);

    return getNatureInfo(a, b);
}

export function getNatureInfo(a, b) {
    var increased = a, decreased = b;

    if (increased == decreased) {
        increased = null;
        decreased = null;
    }

    return new Nature(NatureNameMatrix[a][b], increased, decreased, increased, decreased);
}

export class Nature {

    constructor(name, increased, decreased, favoriteFlavor, dislikedFlavor) {
        this.name = name;
        this.increased = increased;
        this.decreased = decreased;
        this.favoriteFlavor = favoriteFlavor;
        this.dislikedFlavor = dislikedFlavor;
    }

}

export class Statistics {

    constructor(attack, defense, spAttack, spDefense, speed) {
        this[Attribute.Attack] = attack;
        this[Attribute.Defense] = defense;
        this[Attribute.SpAttack] = spAttack;
        this[Attribute.SpDefense] = spDefense;
        this[Attribute.Speed] = speed;
    }

    getResult(nature) {
        var result = JSON.parse(JSON.stringify(this));
        result[nature.increased] = Math.floor(result[nature.increased] * 1.1);
        result[nature.decreased] = Math.floor(result[nature.decreased] * 0.9);

        return result;
    }

}