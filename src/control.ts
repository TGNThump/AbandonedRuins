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
})

script.on_event(defines.events.on_chunk_generated, (event: on_chunk_generated) => {
	let left_top = event.area.left_top as {x: number, y: number};
	let right_bottom = event.area.right_bottom as {x: number, y: number};

	let center = {
		x: left_top.x + right_bottom.x / 2,
		y: left_top.y + right_bottom.y / 2
	};

	if (Random.float() < settings.global['ruins-chance'].value){
		let ruin = Random.of(Ruins);
		if (ruin == null) return;

		let force = game.forces['abandoned'];
		if (force == null) return;

		center.x += Random.float(-10, 10);
		center.y += Random.float(-10, 10);

		if (Math.abs(center.x) < settings.global['ruins-min-distance-from-spawn'].value) return;
		if (Math.abs(center.y) < settings.global['ruins-min-distance-from-spawn'].value) return;

		let percentDamaged = Random.float();

		placeBlueprint(event.surface, center, force, ruin).forEach(entity => {
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

function placeBlueprint(surface: LuaSurface, position: Position, force: LuaForce, blueprintString: string): LuaEntity[]{
	let bluePrintItem = surface.create_entity({
		name: "item-on-ground",
		position,
		stack: {name: "blueprint"}
	} as CreateItemEntityParams);
	if (bluePrintItem == null) return [];

	bluePrintItem.stack.import_stack(blueprintString);

	let entities = bluePrintItem.stack.build_blueprint({
		surface,
		force,
		position,
		force_build: false,
		direction: defines.direction.north
	});

	bluePrintItem.destroy({});

	return entities;
}