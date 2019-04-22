import React, { Component } from 'react';
import hash from 'object-hash';
import Image from './Image';

const female = [
  '002-woman.png',
  '004-woman-1.png',
  '005-woman-2.png',
  '006-woman-3.png',
  '008-woman-4.png',
  '010-woman-5.png',
  '011-woman-6.png',
  '012-woman-7.png',
  '013-woman-8.png',
  '015-woman-9.png',
  '016-woman-10.png',
  '017-woman-11.png',
  '021-woman-12.png',
  '024-woman-13.png',
  '025-woman-14.png',
  '029-woman-15.png',
  '035-hawaiian.png',
  '039-woman-16.png',
  '040-woman-17.png',
  '042-girl.png',
  '045-woman-18.png',
  '046-woman-19.png',
  '050-woman-20.png',
  '051-woman-21.png',
  '060-woman-22.png',
  '062-woman-23.png',
  '064-woman-24.png',
  '067-japanese.png',
  '070-woman-25.png',
  '071-girl-1.png',
  '074-boho.png',
  '075-bride.png',
  '076-girl-2.png',
  '078-woman-26.png',
  '080-woman-27.png',
  '084-woman-28.png',
  '086-punk.png',
  '087-woman-29.png',
  '089-woman-30.png',
  '092-woman-31.png',
  '093-woman-32.png',
  '094-woman-33.png',
];

const male = [
  '001-man.png',
  '003-man-1.png',
  '007-man-2.png',
  '009-man-3.png',
  '014-man-4.png',
  '018-man-5.png',
  '019-man-6.png',
  '020-man-7.png',
  '022-man-8.png',
  '023-man-9.png',
  '026-pirate.png',
  '027-man-10.png',
  '028-boy.png',
  '030-king.png',
  '031-player.png',
  '032-farmer.png',
  '033-professor.png',
  '034-player-1.png',
  '036-boy-1.png',
  '037-scientist.png',
  '038-viking.png',
  '041-man-11.png',
  '043-hipster.png',
  '044-man-12.png',
  '047-man-13.png',
  '048-groom.png',
  '049-man-14.png',
  '052-man-15.png',
  '053-man-16.png',
  '054-man-17.png',
  '055-man-18.png',
  '056-man-19.png',
  '057-man-20.png',
  '058-boy-2.png',
  '059-man-21.png',
  '061-man-22.png',
  '063-man-23.png',
  '065-man-24.png',
  '066-man-25.png',
  '068-check.png',
  '069-worker.png',
  '072-groom-1.png',
  '073-sailor.png',
  '077-hipster-1.png',
  '079-man-26.png',
  '081-customer-service.png',
  '082-man-27.png',
  '083-guard.png',
  '085-man-28.png',
  '088-man-29.png',
  '090-buddhist.png',
  '091-professor-1.png',
  '095-man-30.png',
  '096-man-31.png',
  '097-boy-3.png',
  '098-man-32.png',
  '099-rastafari.png',
  '100-man-33.png',
];

class Avatar extends Component {
  render() {
    const { name, gender, ...rest } = this.props;

    const nameHash = hash(name);

    const maxIndex = gender === 'M' ? male.length : female.length;
    const index = parseInt(nameHash.substr(0, 10), 16) % maxIndex;

    const fileName = gender === 'M' ? male[index] : female[index];

    return (
      <Image src={require(`../res/avatars/${fileName}`)} {...rest} />
    );
  }
}

export default Avatar;
