import Random from "../utils/Random";

export default function(event: script_raised_revive){
  event.entity.rotatable = false;

	if (event.entity.type == 'assembling-machine'){
		event.entity.recipe_locked = true;
	} else if (event.entity.type == 'fluid-turret'){
		event.entity.force = game.forces['abandoned-weaponry'];

		event.entity.insert_fluid({
      amount: Random.int(1, event.entity.fluidbox.get_capacity(1)),
      name: <string> Random.of(['light-oil', 'crude-oil', 'heavy-oil'])
		});
	} else if (event.entity.type == 'electric-turret'){
		event.entity.force = game.forces['abandoned-weaponry'];
	} else if (event.entity.type == 'ammo-turret') {
		event.entity.force = game.forces['abandoned-weaponry'];

		let inventory = event.entity.get_output_inventory();
		let ammoType = 'firearm-magazine';
		inventory.insert({
			name: ammoType,
			count: inventory.get_insertable_count(ammoType) as unknown as number
		});
	}
}