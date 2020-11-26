import RuinSets from "../data/RuinSets";
import RuinSet from "../model/RuinSet";
import { clearSettings, getSettings } from "../model/Settings";

function createForce(name: string, friends: string[]): LuaForce{
  const force = name in game.forces ? game.forces[name] : game.create_force(name);
  force.enable_all_recipes();

  for (const friend of friends){
    if (friend in game.forces) {
      force.set_friend(game.forces[friend], true);
    }
  }
  force.ghost_time_to_live = 1;
  return force;
}

function clearScriptInventory(size: number): LuaInventory{
  let inventories = game.get_script_inventories()[script.mod_name];
  if (inventories === null || inventories.length === 0) {
    return game.create_inventory(size);
  } else {
    let inventory = inventories[0];
    inventory.clear();
    inventory.resize(size);
    return inventory;
  }
}

function insertRuinSet(inventory: LuaInventory, ruinSet: RuinSet) {
  inventory.insert({ name: "blueprint-book" });
  let index = inventory.get_item_count() ;
  let book = inventory[index];
  book.label = ruinSet.name;
  book.import_stack(ruinSet.blueprintBook);
  ruinSet.bookId = index;
  getSettings().ruinSets.push(ruinSet);
}

export default function(){
  createForce('abandoned', ['player', 'enemy']);
  createForce('abandoned-weaponry', game.default_map_gen_settings.peaceful_mode ? ['player', 'enemy'] : ['enemy']);

  clearSettings();
  let inventory = clearScriptInventory(Object.keys(RuinSets).length);

  for (let ruinSet of RuinSets) {
    insertRuinSet(inventory, ruinSet);
  }
}