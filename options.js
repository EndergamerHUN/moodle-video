const saveOptions = () => {
  const speed = document.getElementById('speed').value;
  const skip = document.getElementById('skip').checked;
  const fullscreen = document.getElementById('fullscreen').checked;
  const volume_toggle = document.getElementById('volume_toggle').checked;
  const volume_value = document.getElementById('volume_value').value;
  
  chrome.storage.sync.set({
    speed: speed,
    skip: skip,
    fullscreen: fullscreen,
    volume_toggle: volume_toggle,
    volume_value: volume_value
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

const restoreOptions = () => {
  chrome.storage.sync.get({
    speed: '2',
    skip: true,
    fullscreen: false,
    volume_toggle: false,
    volume_value: '100'
  }, (items) => {
    chrome.commands.getAll((commands) => {
      if (commands[0].shortcut !== '') document.getElementById('shortcut').textContent = commands[0].shortcut
    });
    document.getElementById('speed').value = items.speed;
    document.getElementById('skip').checked = items.skip;
    document.getElementById('fullscreen').checked = items.fullscreen
    document.getElementById('volume_toggle').checked = items.volume_toggle;
    document.getElementById('volume_value').value = items.volume_value;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);