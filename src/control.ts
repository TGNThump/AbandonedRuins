import Configure from "./listeners/Configure";
import ChunkGenerated from "./listeners/ChunkGenerated";
import RuinEntityGenerated from "./listeners/RuinEntityGenerated";
import ChunkCharted from "./listeners/ChunkCharted";

script.on_init(() => Configure());
script.on_event(defines.events.on_runtime_mod_setting_changed, () => Configure());
script.on_event(defines.events.on_player_created, () => Configure());
script.on_event(defines.events.on_chunk_generated, (e: on_chunk_generated) => ChunkGenerated(e));
script.on_event(defines.events.on_chunk_charted, (e: on_chunk_charted) => ChunkCharted(e));
script.on_event(defines.events.script_raised_revive, (e: script_raised_revive) => {
  if ((<LuaForce>e.entity.force).name === 'abandoned') RuinEntityGenerated(e)
});