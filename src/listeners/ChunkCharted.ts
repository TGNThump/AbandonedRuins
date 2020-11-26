export default function(event: on_chunk_charted){
  let surface = game.surfaces[event.surface_index];
  let entities = surface.find_entities_filtered({
    area: event.area,
    force: 'abandoned'
  });

  entities.forEach(entity => {
    entity.force = event.force;
  })
}