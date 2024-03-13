import Image from 'next/image'

export default function OurValues() {
  // Declare a new state variable, which we'll call "count"
  const ourValues = '/about-us/our-values.png'

  return (
    <section
      className="our-values-container container-fluid"
      style={{backgroundImage: `url(${ourValues})`}}
    >
      <div className="our-values-icon-holder">
        <h3 className="text-centre calypso-orange-text">Our Values</h3>
        <div className="row">
          <div className="col-12 col-md-4 col-xs-12">
            <div className="our-value-icon">
              <Image
                alt="Quality icon"
                height="97"
                src="/about-us/quality-icon.png"
                width="70"
              />
            </div>
            <h5 className="text-centre calypso-orange-text">QUALITY</h5>
            <p className="text-centre">
              We never compromise on quality. Our products have achieved a high
              level of customer satisfaction thanks to our commitment to
              sourcing the highest standard of materials.
            </p>
          </div>
          <div className="col-12 col-md-4 col-xs-12">
            <div className="our-value-icon">
              <Image
                alt="Quality icon"
                height="97"
                src="/about-us/ethical-award-icon.png"
                width="70"
              />
            </div>
            <h5 className="text-centre calypso-orange-text">ETHICS</h5>
            <p className="text-centre">
              Our team is crucial to our success. We value every worker and
              maintain an environment where people feel appreciated and
              inspired.
            </p>
          </div>
          <div className="col-12 col-md-4 col-xs-12">
            <div className="our-value-icon-innovation">
              <Image
                alt="Quality icon"
                height="97"
                src="/about-us/innovation-icon.png"
                width="97"
              />
            </div>
            <h5 className="text-centre calypso-orange-text">INNOVATION</h5>
            <p className="text-centre">
              Our mission is to use our research and development expertise to
              create innovative products that ensure everyone is protected from
              the sun.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
