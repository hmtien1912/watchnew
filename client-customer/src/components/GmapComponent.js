import React, { Component } from 'react';

class Gmap extends Component {
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">MY LOCATION</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31351.396900486747!2d106.6880956!3d10.8170812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1700551418124!5m2!1sen!2s" width="800" height="600" style={{ border: 0 }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

    );
  }
}
export default Gmap;