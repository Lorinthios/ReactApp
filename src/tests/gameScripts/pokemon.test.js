import { Pokemon, Statistics, Attribute, Flavor, getNatureInfo } from '../../components/game/gameScripts/pokemon';

it('gets correct nature', () => {
    expect(getNatureInfo(Attribute.Attack, Attribute.Attack).name).toEqual("Hardy");
    expect(getNatureInfo(Attribute.Speed, Attribute.Defense).name).toEqual("Hasty");
    expect(getNatureInfo(Attribute.Speed, Attribute.Defense).dislikedFlavor).toEqual(Flavor.Sour);
});

it('nature augments correctly', () => {
    var pokemon = new Pokemon(1, 1, null, getNatureInfo(Attribute.Attack, Attribute.Defense), new Statistics(10, 10, 10, 10, 10));
    var stats = pokemon.getStats();

    expect(stats[Attribute.Attack]).toEqual(11);
    expect(stats[Attribute.Defense]).toEqual(9);
    expect(stats[Attribute.SpAttack]).toEqual(10);
    expect(stats[Attribute.SpDefense]).toEqual(10);
    expect(stats[Attribute.Speed]).toEqual(10);
});