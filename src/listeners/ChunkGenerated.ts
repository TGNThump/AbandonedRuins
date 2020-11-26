import Random from "../utils/Random";
import { getSettings } from "../model/Settings";
import RuinSet from "../model/RuinSet";
import Colors from "../utils/Colors";

function getRandomRuin(ruinSet: RuinSet): LuaItemStack{
  let ruins = <LuaInventory> game.get_script_inventories()[script.mod_name][0][ruinSet.bookId].get_inventory(defines.inventory.item_main);
  return <LuaItemStack> Random.of(ruins as unknown as LuaItemStack[]);
}

function getCenter(area: BoundingBox): { x: number, y: number }{
  let left_top = area.left_top as {x: number, y: number};
  let right_bottom = area.right_bottom as {x: number, y: number};

  return {
    x: (left_top.x + right_bottom.x) / 2,
    y: (left_top.y + right_bottom.y) / 2
  };
}

function calculateRuinSetToSpawnFrom(center: { x: number; y: number }): RuinSet | null {
  let squareDistanceFromSpawn = center.x * center.x + center.y * center.y;

  let ret: RuinSet | null = null;

  // game.print("Attempting to find ruinSet for chunk " + center.x + ", " + center.y, Colors.WHITE);

  for (let ruinSet of getSettings().ruinSets) {
    if (ruinSet.minimumSquareDistanceFromSpawn !== null) {
      if (squareDistanceFromSpawn < ruinSet.minimumSquareDistanceFromSpawn) {
        // game.print("RuinSet " + ruinSet.name + " too close.", Colors.RED);
        continue;
      }
    }

    if (ruinSet.maximumSquareDistanceFromSpawn !== null) {
      if (squareDistanceFromSpawn > ruinSet.maximumSquareDistanceFromSpawn) {
        // game.print("RuinSet " + ruinSet.name + " too far.", Colors.RED);
        continue;
      }
    }

    if (ret !== null) {
      if (ret.spawnChancePerChunk < ruinSet.spawnChancePerChunk) {
        // game.print("RuinSet " + ruinSet.name + " lesser priority.", Colors.RED);
        continue;
      }
    }

    let random = Random.float();
    if (random < ruinSet.spawnChancePerChunk / 100) {
      // game.print("RuinSet " + ruinSet.name + " promoted, (" + random + " < " + ruinSet.spawnChancePerChunk + ").", Colors.WHITE);
      ret = ruinSet;
    }
  }

  return ret;
}

export default function(event: on_chunk_generated){
  if (event.surface.name !== 'nauvis') return;

  let center = getCenter(event.area);

  let ruinSet = calculateRuinSetToSpawnFrom(center);
  if (ruinSet === null) return;

  // game.print("Spawning ruin of type " + ruinSet.name + " (book " + ruinSet.bookId + ") at " + center.x + ", " + center.y, Colors.WHITE);

  let force = game.forces['abandoned'];
  if (force == null) return;

  center.x += Random.int(-10, 10);
  center.y += Random.int(-10, 10);

  let percentDamaged = Random.float();
  let ruin = getRandomRuin(ruinSet);

  let entities = ruin.build_blueprint({
    surface: event.surface,
    force,
    position: center,
    force_build: false,
    direction: Random.direction()
  });

  // if (entities.length === 0){
  // 	game.print(`Failed to generate ruin at ${center.x}, ${center.y}`, {r:1,g:0,b:0,a:1});
  // }

  entities.forEach(entity => {
    if (Random.float() < percentDamaged){

      let remnantName = entity.ghost_prototype.name + '-remnants';
      if (remnantName in game.entity_prototypes && Random.float() < percentDamaged) {
        entity.surface.create_entity({
          name: remnantName,
          position: entity.position,
          direction: entity.direction,
          force: entity.force
        });
      }

      entity.destroy({});
    } else {
      entity.revive({raise_revive: true});
    }
})
}