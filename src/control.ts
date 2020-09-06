import Random from "./Random";
import Ruins from "./Ruins";

script.on_init(() => {
	let abandoned = game.create_force('abandoned');
	abandoned.research_all_technologies(false);
	abandoned.set_friend(game.forces['player'], true);
	abandoned.set_cease_fire(game.forces['enemy'], true);
	abandoned.ghost_time_to_live = 1;

	let abandonedWeaponry = game.create_force('abandoned-weaponry');
	abandonedWeaponry.research_all_technologies(false);
	abandonedWeaponry.set_cease_fire(game.forces['enemy'], true);
	abandonedWeaponry.ghost_time_to_live = 1;

	// noinspection JSUnusedLocalSymbols
	let inventory = game.create_inventory(1);

	reloadModConfig();
})

script.on_event(defines.events.on_runtime_mod_setting_changed, () => {
	reloadModConfig();
});

function reloadModConfig(){
	let inventory = <LuaInventory> game.get_script_inventories()[script.mod_name][0];
	inventory.clear();
	inventory.insert({ name: "blueprint-book" });
	let book = inventory[1];

	let blueprintBookString = settings.global['ruins-book'].value as string;
	if (blueprintBookString === "") {
		blueprintBookString = Ruins;
	}

	book.import_stack(blueprintBookString);
}

function getRandomRuin(): LuaItemStack{
	let ruins = <LuaInventory> game.get_script_inventories()[script.mod_name][0][1].get_inventory(defines.inventory.item_main);
	return <LuaItemStack> Random.of(ruins as unknown as LuaItemStack[]);
}

script.on_event(defines.events.on_chunk_generated, (event: on_chunk_generated) => {
	let left_top = event.area.left_top as {x: number, y: number};
	let right_bottom = event.area.right_bottom as {x: number, y: number};

	let center = {
		x: left_top.x + right_bottom.x / 2,
		y: left_top.y + right_bottom.y / 2
	};

	if (Random.float() < settings.global['ruins-chance'].value){
		let force = game.forces['abandoned'];
		if (force == null) return;

		center.x += Random.float(-10, 10);
		center.y += Random.float(-10, 10);

		if (Math.abs(center.x) < settings.global['ruins-min-distance-from-spawn'].value) return;
		if (Math.abs(center.y) < settings.global['ruins-min-distance-from-spawn'].value) return;

		let percentDamaged = Random.float();

		getRandomRuin().build_blueprint({
			surface: event.surface,
			force,
			position: center,
			force_build: false,
			direction: defines.direction.north
		}).forEach(entity => {
			if (Random.float() < percentDamaged){
				entity.destroy({});
			} else {
				entity.revive({raise_revive: true});
			}
		})
	}
})

script.on_event(defines.events.script_raised_revive, (event: script_raised_revive) => {
	if (event.entity.type == 'assembling-machine'){
		event.entity.recipe_locked = true;
	}
	if (event.entity.type == 'ammo-turret'){
		event.entity.force = game.forces['abandoned-weaponry'];

		let inventory = event.entity.get_output_inventory();
		let ammoType = 'firearm-magazine';
		inventory.insert({
			name: ammoType,
			count: inventory.get_insertable_count(ammoType) as unknown as number
		});
	}
})