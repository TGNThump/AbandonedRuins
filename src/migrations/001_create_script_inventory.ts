import Ruins from "../Ruins";

let scriptInventories = game.get_script_inventories()[script.mod_name];
if (scriptInventories === null || scriptInventories.length === 0){
  let inventory = game.create_inventory(1);
  inventory.insert({ name: "blueprint-book" });
  let book = inventory[1];

  let blueprintBookString = settings.global['ruins-book'].value as string;
  if (blueprintBookString === "") {
    blueprintBookString = Ruins;
  }

  book.import_stack(blueprintBookString);
}