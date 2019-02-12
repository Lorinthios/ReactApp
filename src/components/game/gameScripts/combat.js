import { Attribute } from './pokemon';

export function calculateDamage(move, attacker, defender) {
    var result = ((2.0 * attacker.level) / 5.0) + 2.0;
    var attack = move.isSpecial ? Attribute.SpAttack : Attribute.Attack;
    var defense = move.isSpecial ? Attribute.SpDefense : Attribute.Defense;

    result = result * move.power * (attacker.getStats()[attack] * 1.0 / defender.getStats()[defense]);
    result = result / 50.0;

    result = result * getModifier(move, attacker, defender);
}

function getModifier(move, attacker, defender) {
    var targets = 1.0;
    var weather = 1.0;
    var badge = 1.0;
    var critical = 1.0;
    var random = getRandomModifier();
    var STAB = getStabModifier(move, attacker);
    var type = getMoveModifierAgainstPokemon(move, defender);
    var burn = 1.0;
    var other = 1.0;

    return targets * weather * badge * critical * random * STAB * type * burn * other;
}

export const TypeEffectivenessMatrix = {
    "0": {
        "5": 0.5,
        "7": 0.0,
        "8": 0.5
    },
    "1": {
        "0": 2.0,
        "2": 0.5,
        "3": 0.5,
        "5": 2.0,
        "6": 0.5,
        "7": 0.0,
        "8": 2.0,
        "13": 0.5,
        "14": 2.0,
        "16": 2.0,
        "17": 0.5
    },
    "2": {
        "1": 2.0,
        "5": 0.5,
        "6": 2.0,
        "8": 0.5,
        "11": 2.0,
        "12": 0.5
    },
    "3": {
        "3": 0.5,
        "4": 0.5,
        "5": 0.5,
        "7": 0.5,
        "8": 0.0,
        "11": 2.0,
        "17": 2.0
    },
    "4": {
        "2": 0.0,
        "3": 2.0,
        "5": 2.0,
        "6": 0.5,
        "8": 2.0,
        "9": 2.0,
        "11": 0.5,
        "12": 2.0,
    },
    "5": {
        "1": 0.5,
        "2": 2.0,
        "4": 0.5,
        "6": 2.0,
        "8": 0.5,
        "9": 2.0,
        "14": 2.0
    },
    "6": {
        "1": 0.5,
        "2": 0.5,
        "3": 0.5,
        "7": 0.5,
        "8": 0.5,
        "9": 0.5,
        "11": 2.0,
        "13": 2.0,
        "16": 2.0,
        "17": 0.5
    },
    "7": {
        "0": 0.0,
        "7": 2.0,
        "13": 2.0,
        "16": 0.5
    },
    "8": {
        "5": 2.0,
        "8": 0.5,
        "9": 0.5,
        "10": 0.5,
        "12": 0.5,
        "14": 2.0,
        "17": 2.0
    },
    "9": {
        "5": 0.5,
        "6": 2.0,
        "8": 2.0,
        "9": 0.5,
        "10": 0.5,
        "11": 2.0,
        "14": 2.0,
        "15": 0.5
    },
    "10": {
        "4": 2.0,
        "5": 2.0,
        "9": 2.0,
        "10": 0.5,
        "11": 0.5,
        "15": 0.5
    },
    "11": {
        "2": 0.5,
        "3": 0.5,
        "4": 2.0,
        "5": 2.0,
        "6": 0.5,
        "8": 0.5,
        "9": 0.5,
        "10": 2.0,
        "11": 0.5,
        "15": 0.5
    },
    "12": {
        "2": 2.0,
        "4": 0.0,
        "10": 2.0,
        "11": 0.5,
        "12": 0.5,
        "15": 0.5
    },
    "13": {
        "1": 2.0,
        "3": 2.0,
        "8": 0.5,
        "13": 0.5,
        "16": 0.0
    },
    "14": {
        "2": 2.0,
        "4": 2.0,
        "8": 0.5,
        "9": 0.5,
        "10": 0.5,
        "11": 2.0,
        "14": 0.5,
        "15": 2.0
    },
    "15": {
        "8": 0.5,
        "15": 2.0,
        "17": 0.0
    },
    "16": {
        "1": 0.5,
        "7": 2.0,
        "13": 2.0,
        "16": 0.5,
        "17": 0.5
    },
    "17": {
        "1": 2.0,
        "3": 0.5,
        "8": 0.5,
        "9": 0.5,
        "15": 2.0,
        "16": 2.0
    }
}

function getRandomModifier() {
    return (Math.random() * 0.15) + 0.85;
}

function getStabModifier(move, attacker) {
    var modifier = 1.0;
    for (var i = 0; i < attacker.types.length; i++) {
        if (attacker.types[i] == move.type)
            modifier = 1.5;
    }

    return modifier;
}

export function getTypeModifier(attackType, defenderType) {
    var modifier = TypeEffectivenessMatrix[attackType][defenderType];

    if (modifier != null)
        return modifier;
    return 1.0;
}

export function getMoveModifierAgainstPokemon(move, defender) {
    var modifier = 1.0;
    for (var i = 0; i < defender.types.length; i++) {
        modifier = modifier * getTypeModifier(move.type, defender.types[i]);
    }

    return modifier;
}

