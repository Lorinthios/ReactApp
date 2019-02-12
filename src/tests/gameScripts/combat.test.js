import { getMoveModifierAgainstPokemon, getTypeModifier } from '../../components/game/gameScripts/combat';
import { Pokemon, Type, Nature, Statistics } from '../../components/game/gameScripts/pokemon';

it('modifies damage', () => {
    expect(getTypeModifier(Type.fire, Type.grass)).toEqual(2.0);
    expect(getTypeModifier(Type.grass, Type.fire)).toEqual(0.5);
    expect(getTypeModifier(Type.normal, Type.normal)).toEqual(1.0);
    expect(getTypeModifier(Type.normal, Type.ghost)).toEqual(0);
});

it('modifies damage against pokemon', () => {
    var move = {
        type: Type.fire,
        power: 40,
        isSpecial: false
    }
    var pokemon = new Pokemon(1, [Type.grass], 1, null, new Statistics(10, 10, 10, 10, 10));

    expect(getMoveModifierAgainstPokemon(move, pokemon)).toEqual(2.0);
});

it('modifies damage against pokemon further', () => {
    var move = {
        type: Type.fire,
        power: 40,
        isSpecial: false
    }
    var pokemon = new Pokemon(1, [Type.bug, Type.grass], 1, null, new Statistics(10, 10, 10, 10, 10));

    expect(getMoveModifierAgainstPokemon(move, pokemon)).toEqual(4.0);
});