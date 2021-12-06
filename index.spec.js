import {
  useDateInput,
  allowedKeys,
} from './index';

test('allowed Keys should be correct', () => {
  expect(allowedKeys).toEqual([
    '1','2','3','4','5','6','7','8','9','0','.',
  ]);
});

test('should get correct input format with zero', () => {
  const {
    handleInput,
  } = useDateInput();
  let newVal = '';
  newVal = handleInput('a');
  expect(newVal).toEqual('');

  // 1. input
  newVal = handleInput('1');
  expect(newVal).toEqual('1');
  // 2. input
  newVal = handleInput(`${newVal}1`);
  expect(newVal).toEqual('11.');
  // 3. input
  newVal = handleInput(`${newVal}0`);
  expect(newVal).toEqual('11.0');
  // 4. input
  newVal = handleInput(`${newVal}8`);
  expect(newVal).toEqual('11.08.');
  // 5. input
  newVal = handleInput(`${newVal}1`);
  expect(newVal).toEqual('11.08.1');
  // 6. input
  newVal = handleInput(`${newVal}9`);
  expect(newVal).toEqual('11.08.19');
  // 7. input
  newVal = handleInput(`${newVal}8`);
  expect(newVal).toEqual('11.08.198');
  // 8. input
  newVal = handleInput(`${newVal}4`);
  expect(newVal).toEqual('11.08.1984');
});

test('should get correct input format without zero', () => {
  const {
    handleInput,
  } = useDateInput();
  let newVal = '';

  // 1. input
  newVal = handleInput('1');
  expect(newVal).toEqual('1');
  // 2. input
  newVal = handleInput(`${newVal}.`);
  expect(newVal).toEqual('01.');
  // 3. input
  newVal = handleInput(`${newVal}1`);
  expect(newVal).toEqual('01.1');
  // 4. input
  newVal = handleInput(`${newVal}.`);
  expect(newVal).toEqual('01.01.');
});

test('should handle stupid inputs', () => {
  const {
    handleInput,
  } = useDateInput();
  let newVal = '';

  // 1. dot at first (switch . default case)
  newVal = handleInput('.');
  expect(newVal).toEqual('');
  // Case for 1.. @TODO need?
  newVal = handleInput('1..');
  expect(newVal).toEqual('1..');
  // @TODO need/fail?
  newVal = handleInput('912');
  expect(newVal).toEqual('912');
  // case 3/6 @TODO need?
  newVal = '12.11';
  newVal = handleInput(`${newVal}0`);
  expect(newVal).toEqual('12.11.0');
  // 22.30.0
});

test('handleInput should set default value', () => {
  const {
    handleInput,
  } = useDateInput();
  expect(handleInput()).toEqual('');
});

test('should get correct input format by default', () => {
  const {
    handleInput,
  } = useDateInput();
  expect(handleInput('11.08.1984')).toEqual('11.08.1984');
});
