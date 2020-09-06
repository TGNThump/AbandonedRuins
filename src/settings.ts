data.extend([
  {
    type: "int-setting",
    name: "ruins-min-distance-from-spawn",
    setting_type: "runtime-global",
    default_value: 100,
  },
  {
    type: "double-setting",
    name: "ruins-chance",
    setting_type: "runtime-global",
    default_value: 0.2,
    minimum_value: 0.0,
    maximum_value: 1.0,
  },
  {
    type: "string-setting",
    name: "ruins-book",
    setting_type: "runtime-global",
    default_value: '',
    allow_blank: true,
  }
]);
