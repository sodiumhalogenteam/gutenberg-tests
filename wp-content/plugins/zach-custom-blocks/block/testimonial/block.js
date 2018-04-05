(function(blocks, components, i18n, element) {
  let el = element.createElement;

  blocks.registerBlockType(
    // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    "zach/testimonial-block",
    {
      // The title of our block.
      title: i18n.__("Zach Testimonial"),

      // Dashicon icon for our block.
      icon: "megaphone",

      // The category of the block.
      category: "common",

      // Necessary for saving block content.
      attributes: {
        name: {
          type: "array",
          source: "children",
          selector: "p.zach-testimonial-name"
        },
        position: {
          type: "array",
          source: "children",
          selector: "p.zach-testimonial-position"
        },
        testimonial: {
          type: "array",
          source: "children",
          selector: "p"
        },
        mediaID: {
          type: "number"
        },
        mediaURL: {
          type: "string",
          source: "attribute",
          selector: "img",
          attribute: "src"
        },
        alignment: {
          type: "string",
          default: "center"
        }
      },

      edit: function(props) {
        let focus = props.focus;
        let focusedEditable = props.focus
          ? props.focus.editable || "name"
          : null;
        let alignment = props.attributes.alignment;
        let attributes = props.attributes;
        let contactURL = props.attributes.contactURL;

        let onSelectImage = function(media) {
          return props.setAttributes({
            mediaURL: media.url,
            mediaID: media.id
          });
        };

        function onChangeAlignment(newAlignment) {
          props.setAttributes({ alignment: newAlignment });
        }

        return [
          !!focus &&
            el(
              // Display controls when the block is clicked on.
              blocks.BlockControls,
              { key: "controls" },
              el(blocks.AlignmentToolbar, {
                value: alignment,
                onChange: onChangeAlignment
              })
            ),
          el(
            "div",
            { className: props.className },
            el(
              "div",
              {
                className: attributes.mediaID
                  ? "zach-testimonial-image image-active"
                  : "zach-testimonial-image image-inactive",
                style: attributes.mediaID
                  ? { backgroundImage: "url(" + attributes.mediaURL + ")" }
                  : {}
              },
              el(blocks.MediaUpload, {
                onSelect: onSelectImage,
                type: "image",
                value: attributes.mediaID,
                render: function(obj) {
                  return el(
                    components.Button,
                    {
                      className: attributes.mediaID
                        ? "image-button"
                        : "button button-large",
                      onClick: obj.open
                    },
                    !attributes.mediaID
                      ? i18n.__("Upload Image")
                      : el("img", { src: attributes.mediaURL })
                  );
                }
              })
            ),
            el(
              "div",
              {
                className: "zach-testimonial-content",
                style: { textAlign: alignment }
              },
              el(blocks.RichText, {
                tagName: "p",
                inline: true,
                placeholder: i18n.__("Write the testimonial here..."),
                value: attributes.testimonial,
                onChange: function(newTestimonial) {
                  props.setAttributes({ testimonial: newTestimonial });
                },
                focus: focusedEditable === "testimonial" ? focus : null,
                onFocus: function(focus) {
                  props.setFocus(
                    _.extend({}, focus, { editable: "testimonial" })
                  );
                }
              }),
              el(blocks.RichText, {
                tagName: "p",
                className: "zach-testimonial-name",
                inline: false,
                placeholder: i18n.__("Name"),
                value: attributes.name,
                onChange: function(newName) {
                  props.setAttributes({ name: newName });
                },
                focus: focusedEditable === "name" ? focus : null,
                onFocus: function(focus) {
                  props.setFocus(_.extend({}, focus, { editable: "name" }));
                }
              }),
              el(blocks.RichText, {
                tagName: "p",
                className: "zach-testimonial-position",
                inline: false,
                placeholder: i18n.__("Position"),
                value: attributes.position,
                onChange: function(newPosition) {
                  props.setAttributes({ position: newPosition });
                },
                focus: focusedEditable === "position" ? focus : null,
                onFocus: function(focus) {
                  props.setFocus(_.extend({}, focus, { editable: "position" }));
                }
              })
            )
          )
        ];
      },

      save: function(props) {
        let attributes = props.attributes;
        let alignment = props.attributes.alignment;
        return el(
          "div",
          { className: props.className },
          attributes.mediaURL &&
            el(
              "div",
              {
                className: "zach-testimonial-image",
                style: { backgroundImage: "url(" + attributes.mediaURL + ")" }
              },
              el("img", { src: attributes.mediaURL })
            ),
          el(
            "div",
            {
              className: "zach-testimonial-content",
              style: { textAlign: attributes.alignment }
            },
            attributes.testimonial && el("p", {}, attributes.testimonial),
            el("p", { className: "zach-testimonial-name" }, attributes.name),
            attributes.position &&
              el(
                "p",
                { className: "zach-testimonial-position" },
                attributes.position
              )
          )
        );
      }
    }
  );
})(window.wp.blocks, window.wp.components, window.wp.i18n, window.wp.element);
