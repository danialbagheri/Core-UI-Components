import Image from 'next/image'

export default function Past() {
  // Declare a new state variable, which we'll call "count"
  return (
    <section className="container-fluid bg-our-history our-history-row">
      <div className="row">
        <div className="col-8 col-md-8 col-sm-12 pt-1">
          <Image
            alt="Calypso 1999 to 2019 products"
            height={300}
            sizes="100vw"
            src="/about-us/calypso-history.jpg"
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
          />
        </div>
        <div className="col-4 col-md-4 text-centre col-sm-12 our-history-row-text">
          <h5 className="text-centre calypso-orange-text">PAST AND PRESENT</h5>
          <hr className="short-line" />
          <p className="text-centre mb-4">
            Created in Manchester in 1988, Calypso set out to provide families
            with quality sun care products at the right price. We believe
            everyone should be able to enjoy the benefits of the sun without any
            risk of sun damage. Over the years, we have expanded and now sell in
            over thirty countries worldwide.
          </p>
          {/* eslint-disable-next-line */}
          <a
            className="btn bt-round btn-round-calypso mt-4"
            href="/about/history"
          >
            OUR HISTORY
          </a>
        </div>
      </div>
    </section>
  )
}
