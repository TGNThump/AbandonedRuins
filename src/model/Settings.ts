import RuinSet from "./RuinSet";

export default interface Settings{
  ruinSets: RuinSet[]
}

export function clearSettings() {
  global['abandoned-ruins'] = {
    ruinSets: []
  } as Settings;
}

export function getSettings(): Settings{
  return global['abandoned-ruins'];
}