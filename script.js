class FormatterData {
  constructor(selector, source) {
    this.selector = selector;
    this.source = source;

    return this.innerHTML();
  }

  innerHTML() {
    const el = document.getElementById(this.selector);
    el.querySelector('ul').innerHTML = this.toInterval(this.source).filter(item => !!item).map(this.format).map(this.toHTML).join(' ');
  }

  toInterval({days, order}) {
    let key = 0;
    let prev;

    return order.reduce((group, day) => {
      if (!days[day]) {
        key++;
        return group;
      }

      const time = this.interval(days[day]);

      if (prev !== time) {
        key++;
        prev = time;
      }

      if (!group[key]) {
        group[key] = { names: [], time }
      }

      group[key].names.push(day);

      return group;
    }, [])
  };

  interval({ start, end }) {
    const format = 'h:mm A';
    return `${this.decimal(start).format(format)} - ${this.decimal(end).format(format)}`;
  };

  decimal = time => moment().startOf('d').add(time, 'h');

  weekDay = day => moment(day, 'dddd').format('ddd');

  format = ({ names, time }) => {
    if (names.length === 1) {
      return `${this.weekDay(names[0])}: ${time}`
    } else {
      return `${this.weekDay(names[0])} - ${this.weekDay(names[names.length - 1])}: ${time}`;
    }
  };

  toHTML = item => `<li>${item}</li>`;
}

new FormatterData('box1', source);
new FormatterData('box2', source2);
new FormatterData('box3', source3);
